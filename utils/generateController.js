module.exports = function (model, overrides) {
    var controller = {
        findByParam: function (req, res, next, id) {
            model.findById(id, function (err, doc) {
                if (err) next(new Error("Data not found"));
                req.docId = doc.id;
                next();
            });
        },
        createOne: function (req, res, next) {
            model.create(req.body, function (err, doc) {
                if (err) next(err);
                    res.send(doc);
            });
        },
        deleteOne: function (req, res, next) {
            var id = req.docId;
            model.deleteOne({ _id: id }, function (err, doc) {
                if (err) next(err);
                res.send(doc);
            });
        },
        deleteAll:function(req,res,next) {
            model.remove({},function(){
                if(err) next(err);
                res.json({message:"deleted all users"})
            })
        },
        getAll: function (req, res, next) {
            model.find({}, function (err, docs) {
                if (err) next(err);
                res.status(200).send(docs);
            });
        },
        
        getOne: function (req, res, next) {
            const id = req.decoded._id || req.params._id;
            model.findById(id, function (err, docs) {
                if (err) return next(err);
                res.json(docs);
            });
        },
        updateOne: function (req, res, next) {
            var id = req.decoded._id;
            var body = req.body;
            
            model.findByIdAndUpdate(id ,{$set:{body} },{new:true}, function (err, doc) {
                if (err) next(err);
                var updated = Object.assign({}, doc, body);
                res.status(200).send(updated);
            });
        }
    };

    if (!overrides) {
        overrides = {}
    }

    return Object.assign({}, controller, overrides);
};