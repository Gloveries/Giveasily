import React, {Component} from 'react';
import { TopCard, Filter, BottomBoxes, EmailConfirmationOverlay } from './utils';
import ReactLoading from 'react-loading'
import { registeredCompanies } from '../../data';
import { Card, CardBody } from 'mdbreact';
import axios from 'axios';
import {getUrl} from '../../data/urlController';
import {connect} from 'react-redux';
import USER from '../../data/userData';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'



const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

class Main extends Component {
    constructor(props){
        super(props);

        this.state ={
            companyList:[],
            purposes:[],
            specify_more_details:false,
            date_to_redeem_pledge:undefined,
            type_of_giving:'donate',
            anchorEl_1:null,
            anchorEl_2:null,
            anchorEl_3: null,
            display_texts:['Last 24hrs','Last week','Last Month','Last year','All'],
            dropdown_text1:'All',
            dropdown_text2:'All',
            dropdown_text3:'All',
            donationsAmount:undefined,
            pledgesCount:undefined,
            donationsCount:undefined
        }


        this.populatePurposeField = this.populatePurposeField.bind(this);
        this.handleSelectInput = this.handleSelectInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.payWithPaystack = this.payWithPaystack.bind(this);
        this.savePledge = this.savePledge.bind(this);
        this.verifyTransaction = this.verifyTransaction.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleTopCardClick = this.handleTopCardClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fillTopCards = this.fillTopCards.bind(this);
        this.getDonationsCount = this.getDonationsCount.bind(this)
        this.getPledgesCount = this.getPledgesCount.bind(this);
        this.getDonationsAmount = this.getDonationsAmount.bind(this);
        this.getEndAt - this.getEndAt.bind(this);
    }

componentDidMount() {

   this.getCompanyList();//gets the total companies list in the database
   this.fillTopCards(); // fill in data in the top information cards


}

fillTopCards() {
const url = getUrl('starter');
const that = this;

const options = {
    method:'GET',
    url:url,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token':  USER.getLocalStorageUserData().token,
    }
}

axios(options)
   .then(function(response){
       const data = response.data;
       let {pledgesCount, donationsCount, donationsAmount} = data;
       if(donationsAmount.length === 0){
            donationsAmount = 0 + " Naira";
       } else {
            donationsAmount = donationsAmount[0].total + " Naira";
       }
       pledgesCount = pledgesCount + " Pledges";
       donationsCount = donationsCount + " Donations"
       that.setState({
            donationsCount,pledgesCount,donationsAmount
       })
   })
   .catch(function(err){
       console.log(err)
   })
}

getCompanyList() {
    const that = this;
    // let companyList = registeredCompanies;
    const url = getUrl('users')
        var options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        }
        // ,
        // params:{                     //This is no longer necessary as i am enforcing that any non admin
        //     complete:true,              //will only be able to request verified coporate users i.e where
        //     category:'coporate'          //'complete:true' and 'category:coporate'
        // }
    }
    axios(options)
    .then(function(response) {
        if(response.status === 200) {
            const companyList = response.data;
            if(companyList.length === 0) {
                alert('no companies registered yet');
                return;
            }
            that.setState({
                companyList
            })
        }
    })
    .catch(function(err){
        console.log(err)
    })

}

handleClick1(event) {

  event.stopPropagation();
//   event.currentTarget.style.background = "black"
this.first = true;
this.second = false;
this.third = false
    this.setState({ anchorEl_1: event.currentTarget });
};
handleClick2(event) {

  event.stopPropagation();
  this.first = false;
  this.second = true;
  this.third = false;
//   event.currentTarget.style.background = "black"
    this.setState({ anchorEl_2: event.currentTarget });
};
handleClick3(event) {

  event.stopPropagation();
  this.first = false;
  this.second = false;
  this.third = true
    this.setState({ anchorEl_3: event.currentTarget });
};

handleClose(e){
    this.setState({ anchorEl_1: null,anchorEl_2: null,anchorEl_3: null});

}


getEndAt(text) {

    switch(text) {
        case 'Last 24hrs':
            return moment().subtract(1,'days').format();
        case 'Last week':
            return moment().subtract(1,'weeks').format();           
        case 'Last Month':
            return moment().subtract(1,'months').format();        
        case 'Last year':
            return moment().subtract(1,'years').format();  
        default:
            return 'All'    //the server will handle this case the server will not use statAt and endAt       
    }
    
}

getDonationsCount(startAt) {
    const that = this;
    const url = getUrl('get_donations_count');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            const data = response.data;
            const count = data.count;
            const donationsCount = count + " Donations"
            that.setState({
                donationsCount
                })
            })
        .catch(function(err){
            console.log(err)
        })
}

getDonationsAmount(startAt) {
    const that = this;
    const url = getUrl('get_donations_amount');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            let data = response.data;
            let donationsAmount;
            
            if(data.length === 0){
                    donationsAmount = 0 + " Naira";
            } else {
                    donationsAmount = data[0].total + " Naira";
            }
            that.setState({
                    donationsAmount
            })
        })
        .catch(function(err){
            console.log(err)
        })
}

getPledgesCount(startAt) {
    const that = this;
    const url = getUrl('get_pledges_count');
    const endAt = moment().format();
    const options = {
        method:'GET',
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            startAt,
            endAt
        }
    }

    axios(options)
        .then(function(response){
            const data = response.data;
            const count = data.count;
            const pledgesCount = count + " Donations"
            that.setState({
                pledgesCount
                })
            })
        .catch(function(err){
            console.log(err)
        })
}


handleTopCardClick(text){
const endAt = this.getEndAt(text)

if(this.first) {
    this.setState({ anchorEl_1: null,dropdown_text1:text,donationsCount:undefined });
    //resetting donationsCount to undefined here is so that donations Card will display 'loading'
    this.getDonationsCount(endAt);
    return;
} 
if(this.second){
    this.setState({ anchorEl_2: null,dropdown_text2:text, donationsAmount:undefined });
        //resetting donationsAmount to undefined here is so that donations Card will display 'loading'

    this.getDonationsAmount(endAt);
    return;
}

if(this.third) {
    this.setState({ anchorEl_3: null,dropdown_text3:text, pledgesCount:undefined });
    //resetting pledgesCount to undefined here is so that donations Card will display 'loading'
    this.getPledgesCount(endAt)
}


}

handleSelectInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'purpose') {
        this.purpose = value;
        if(value === "project" || value==="others") {
            const specify_more_details = true;
            this.setState({
                specify_more_details
            })
        }
    else {
        if(this.state.specify_more_details) {
            const specify_more_details = false;
            this.setState({
                specify_more_details
            })
        }
    }
    }

    else if(name ==='type_of_giving') {
            const type_of_giving = value;
            this.setState({
                type_of_giving
            })
    }

    else if(name === 'pledge_date') {

        const date_to_redeem_pledge = value;
        this.setState({
            date_to_redeem_pledge
        })
    }


}

populatePurposeField = function (e) {
    const companyName = e.target.value
    if(companyName === 'choose organisation') {
        this.setState({
            purposes:[] // When 'choose organisation' is selected,This will remove the purpose field that may have already been populated
            
        })
        return;
    }
    this.coporate_body = this.state.companyList.find(function(el){
        return el.business_name === companyName;
    })
    // const purposes = coporate_body.purposes;
    const church_purposes = ['tithes','First Fruits','offerings','project','others']
    const other_purposes = ['contributions','project','others'];
    const purposes = (this.coporate_body.church)? church_purposes:other_purposes;

    this.setState({
        purposes
    })
}

handleSubmit(e) {
    e.preventDefault();

    const organisation = e.target.organisation;
    if(organisation.value === 'choose organisation') {
         alert('please choose who you want to give to'); 
         organisation.focus();
         return

    }

    let body;
    const type= this.state.type_of_giving; //either 'donate' or 'pledge';
    const beneficiaryId = this.coporate_body._id;
    const purpose = this.purpose; //either tithes or offering or monthly collection or any of the other types
    const amount = Number(e.target.amount.value);
    const platform = 'dashboard'; //from your dashboard another option can be from forms but this function is only accessible from dashboard
    // const benefactorId = this.props.user._id;
    // const email = this.props.user.email;
    const benefactorId = USER.getLocalStorageUserData()._id;
    const email = USER.getLocalStorageUserData().email;
    const description = (this.state.specify_more_details)? e.target.describe.value:"" //if you select 'others' as purpose you will need to describe your purpose in the description field
    // if(!Boolean(email)) alert('an error occured'); return;



    body = {
        type,beneficiaryId,purpose,amount,benefactorId,platform,email,description
    }

    if(type === 'donate') {
        this.payWithPaystack(body)
    } else if(type === 'pledge') {
            const purposeField = e.target.purpose;
            if(purposeField.value === 'select purpose') {
                alert("please enter the purpose for your pledge");
                purposeField.focus();
            }
            const date_to_redeem_pledge = this.state.date_to_redeem_pledge;
            const status = 'unredeemed';
            body.date_to_redeem_pledge = date_to_redeem_pledge;
            body.status = status; //All pledge status will be 'unredeemed' at ht estage of initiation.

            this.savePledge(body)

    }

}

verifyTransaction(reference){
    const url = getUrl('verify_payment')+'/'+reference;
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        params:{
            complete:true,
            category:'coporate'
        }
    }
    axios(options)
        .then(function(response){
            if(response.status === 200){
                const data = response.data
                    if(data.title === 'success') {
                        alert(data.message)
                        }
                    }
                })
        .catch(function(err){
            console.log(err)
        })

}

savePledge(body){
    
    const url = getUrl('create_pledge');
    const options = {
        method:'POST',
        data:body,
        url:url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': USER.getLocalStorageUserData().token
        }
    }
    axios(options)
        .then(function(response){
            if(response.status === 200) {
                const data = response.data;
                if(data.title === 'success') alert('Thank you for your pledge:'+ data.message);
                else if(data.title === 'failed') alert(data.title+ " : "+data.message)
            }
        })
        .catch(function(err){
            console.log(err)
        })
}

    payWithPaystack({ email,purpose, amount, platform, type, beneficiaryId, benefactorId,description }){
        

        var handler = window.PaystackPop.setup({
            key: 'pk_test_4edb6704ac9c9db84e986ca247970a5160fe5651',
            email,
            amount,
            // ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [
                    {                          
                        purpose,
                        description,
                        type,
                        platform,
                        beneficiaryId,
                        benefactorId,
                        amount
                    }
                ]
            },
            callback: function (response) {
                alert('success. transaction is submitted for verification ' + response.reference);
                console.log(response)
                //this.verifyTransaction(response.reference)

            },
            onClose: function () {
                alert('window closed');
            }
        });
        handler.openIframe();
    }

render() {
    const specifyMoreDetailsClass = (this.state.specify_more_details)?"animated fadeIn bg-color-grey-3 border-bottom-theme-color":"dont-display";
    const showPledgeDate = (this.state.type_of_giving === 'pledge')?"animated fadeIn bg-color-grey-3 border-bottom-theme-color":"dont-display";
    return (
<div>
<div className="container donation-form-card">
    <div className="row">       
        <div className="col">
            <TopCard 
                anchorEl={this.state.anchorEl_1}
                handleClose={this.handleClose}
                handleClick={this.handleClick1}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text1}
                purpose="Total Donations Made"
                result={this.state.donationsCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
            </div>
            <div className="col">
                <TopCard 
                anchorEl={this.state.anchorEl_2}
                handleClose={this.handleClose}
                handleClick={this.handleClick2}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text2}
                purpose="Total Amount Donated"
                result={this.state.donationsAmount}
                handleTopCardClick={this.handleTopCardClick}
                 />
            </div>
            <div className="col" >
                <TopCard 
                anchorEl={this.state.anchorEl_3}
                handleClose={this.handleClose}
                handleClick={this.handleClick3}
                handle={this.handleTopCardClick}
                display_texts={this.state.display_texts}
                dropdown_text={this.state.dropdown_text3}
                purpose="Total Pledges"
                result={this.state.pledgesCount}
                handleTopCardClick={this.handleTopCardClick}
                 />
            </div>

    </div>

<br /><br />


    <Card style={{borderTop:"2px solid #290c49"}}>
        <CardBody>
            <form onSubmit={this.handleSubmit} className="donation-form"><br /> 
            <h5 className="theme-color"><b>GiveQuickly</b><sup>TM</sup></h5>
            <hr className="bg-theme" /><br />
            <div className="bg-color-grey-3 border-bottom-theme-color">
                <p className="theme-color pl-2">Choose how you want to give</p>
                <select onChange={this.handleSelectInput} name="type_of_giving" required className="form-control bg-color-grey-3 modify-input-border"> 
                    <option value="donate">donate</option>
                    <option value="pledge">pledge</option>                             
                </select> 
            </div><br />
            <div className={showPledgeDate}>
                <p className="theme-color">When will you redeem your pledge?</p>
                <input onChange={this.handleSelectInput} required={(this.state.type_of_giving === 'pledge')?true:false}
                 name="pledge_date" type="date" value={this.state.pledge_date_at} className="form-control modify-input-border" /> 
            </div><br />
            <div  className="bg-color-grey-3 border-bottom-theme-color">
                <p className="theme-color pl-2">Choose the amount you want to give </p>
                <input name="amount" placeholder="amount" required className="form-control modify-input-border bg-color-grey-3" />

            </div><br />                
            <div className="bg-color-grey-3 border-bottom-theme-color pl-2"> 
                <p className="theme-color">Choose who you want to give</p>
                <select required name="organisation"  onChange={this.populatePurposeField} className="form-control bg-color-grey-3 modify-input-border">
                    <option>choose organisation</option>
                        {this.state.companyList.map((val,i)=>{
                            return <option value={val.business_name} key={i}>{val.business_name}</option>
                        })}
                </select> 
            </div><br />

            <div className="bg-color-grey-3 border-bottom-theme-color pl-2">
                <p>Choose what you want to give for</p>
                <select name="purpose" required onChange={this.handleSelectInput} className="form-control bg-color-grey-3 modify-input-border">
                    <option>select purpose</option>                        
                        {this.state.purposes.map((P,i)=>{
                            return <option value={P} key={i}>{P}</option>
                        }
                   )}
                </select> 
            </div>

            <div className={specifyMoreDetailsClass}>
                <p className="bg-theme pl-2">Please describe</p>
                <textarea required={this.state.specify_more_details} name="describe" rows="5" className="form-control modify-input-border" placeholder="Please describe the purpose for your giving"></textarea>
            </div> 

            <div>
                <br /><br/>
                <button type="submit" className="btn btn-success o-correct-btn-radius">Give now!</button>
            </div>
        </form>
        </CardBody>
    </Card>
        
        {/*<BottomBoxes />*/}



<br />
<br />

            
        </div>
</div>
    )
}
}

export default connect(mapStateToProps)(Main);