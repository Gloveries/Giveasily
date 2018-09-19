const Pages = require('./pages.model');
const generateController = require('../../utils/generateController');
const request = require('request-promise');
const getUrl = require('../../utils/getUrl')
const getSecretKey = require('../../utils/getSecretKey')
module.exports = generateController(Pages,{
    createOne: function (req, res, next) {
        console.log("hey work")
        const uri = getUrl('pages');
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'POST',
            uri: uri,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            body:req.body,
            json: true

        }
        
        request(options)
            .then(function(response){
                const data = response.data;
                const {name,amount} = req.body
                const {slug,currency,published,id,type,active,description,createdAt,updatedAt} = data;
                const pageBody = {name,amount,active,slug,currency,published,type,description};
                pageBody.paystack_created_at = createdAt;
                pageBody.paystack_updated_at = updatedAt;
                pageBody.page_id = id
                pageBody.userId = req.decoded._id;
                pageBody.url = getUrl('base_payment_page') + "/" +slug;
                
                Pages.create(pageBody,function(err,page){
                    if(err) return next(err);
                    res.json(page);
                })
            
            })
            .catch(function(err){
            console.log(err);
            return next(err)
        })
        },
        getPagesForOne:function(req,res,next) {
            const userId = req.decoded._id;
            Pages.find({userId},function(err,pages){
                if(err) return next(err);
                    res.json(pages)
        })
    },
    getOne:function(req,res,next){
        const id = req.params.pageId;
        
        Pages.findById(id,function(err,page){
            if(err) return next(err);
            if(page._id != id) return next(new Error("Unauthorised: This document is not owned by you"))
            
            res.json(page);
        })
    },
    updateOne:function(req,res,next) {
        const pageId = req.params.pageId;   //This is the id we will use to query my database
        const slug = req.params.slug    //this is the id we will use to query the page on paystack
        console.log(pageId)
        console.log(slug)
        var pageBuff;
        const uri = getUrl('pages') + "/" +slug;
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'PUT',
            uri: uri,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            body:req.body,
            json: true

        }
        
        Pages.findById(pageId,function(err,page){
            if(err) return next(err);
            
            if(page.userId != req.decoded._id) {return next(new Error("Unauthorised: This document is not owned by you"));} /*When i userd a strict comparison it was false because page._id was of type Object while req.decoded._id was of type String*/
            
//            pageBuff = page;
            
            request(options)
            .then(function(response){
                const data = response.data
                
                if(response.message === "Page updated") {
                    //These are the three items that can be updated
                    page.active = data.active;
                    page.description = data.description;
                    page.amount = (data.amount === null)?"":data.amount;
                    
                    page.save(function(err,UpdatedPage){
                        if(err) return next(err);
                        
                        res.json(UpdatedPage)
                    })
            }
        })
        .catch(function(err){
                return next(err)
            })
    })
        

    }
})
