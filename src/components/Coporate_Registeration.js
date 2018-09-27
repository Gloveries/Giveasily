import React, { Component } from 'react'
import {Button, Fa, Card, CardBody, Popover, PopoverBody, PopoverHeader } from 'mdbreact';
import {getUrl} from '../data/urlController';
import axios from 'axios';
import ReactLoading from 'react-loading'
import USER from '../data/userData'
import {NavLink} from 'react-router-dom'
import logoIcon from '../logo/logo.png'


class CoporateRegisteration extends Component {
   constructor(props) {
    super(props);

    this.state = {
      otherClasses:"dont-display",
      last_name:"",
      first_name:"",
      bvn:"",
      verifiedBvn:false,
      showLoader:false,
      ngo:false,
      founder:false,
      on_whatsapp:false,
      on_facebook:false,
      on_twitter:false,
      on_mobile:false,
      on_website:false,
      church:false
    }
    console.log("".length)
    this.bvnVerification = undefined;
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.verifyBvn = this.verifyBvn.bind(this);
    this.makeBvnVerificationRequest = this.makeBvnVerificationRequest.bind(this);
    this.cancelBvnVerificationRequest = this.cancelBvnVerificationRequest.bind(this)
  }

  handleSelectChange(e){
      this.collectionMethod = e.target.value;
      const name = e.target.name
      if(name === 'collection_method'){
        if(this.collectionMethod === "other_platforms" || this.collectionMethod === "others") {
            this.setState({
                otherClasses:"animated fadeIn"
                })
        } else {
            if(this.state.otherClasses === "animated fadeIn") {
              this.setState({
                  otherClasses:"dont-display"
                })
          }
          
      }
    }

  }

  handleFormSubmit(e) {
      e.preventDefault();
      const that = this;
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const bvn = this.state.bvn;
      const date_of_birth = this.state.formatted_dob;
      const official_phone = e.target.official_phone.value;
      const personal_phone = e.target.personal_phone.value;
      const founder = this.state.founder;
      const ngo = this.state.ngo;
      const business_name = e.target.business_name.value;
      const abbreviated_name = e.target.abbreviated_name.value;
      const settlement_bank = e.target.bank.value;
      const account_number = e.target.account_no.value
      const other_methods = e.target.other_methods.value;
      const other_platforms = this.collectionMethod;
      const coporate_address = e.target.coporate_address.value;
      const on_website = this.state.on_website;
      const on_facebook = this.state.on_website;
      const on_twitter = this.state.on_twitter;
      const on_whatsapp = this.state.on_whatsapp
      const on_mobile = this.state.on_mobile;
      const church = this.state.church
      const media = [
                     {name:'website',active:on_website},{name:'facebook',active:on_facebook},
                     {name:"twitter",active:on_twitter},{name:'whatsapp',active:on_whatsapp},
                     {name:'mobile',active:on_mobile}
                    ]

      const social_platforms = media.filter(function(P){
                                  return P.active === true;
                             })
      const body = {
                    first_name,last_name,official_phone,personal_phone,founder,bvn,account_number,
                    business_name,abbreviated_name,other_methods,date_of_birth,church,
                    coporate_address,other_platforms,settlement_bank,ngo,social_platforms
                   }
      console.log(body);
      const url = getUrl('coporate_registeration');
        var options = {
        method: 'POST',
        url: url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,        }
    }
      axios(options)
        .then(function(response){
            if(response.data.title === 'success') {
                // that.history.push('/')  
                alert('success')
            }      
        })
        .catch(function(err){
            console.log(err)
        })
        
    
  }

  cancelBvnVerificationRequest(){
      console.log('cancelled request')
      clearInterval(this.bvnVerification);
      this.bvnVerification = undefined;
      this.setState({showLoader:false})

  }
  makeBvnVerificationRequest(Response,bvn){
    const that = this;
    if(!this.state.showLoader) this.setState({showLoader:true})

    const url = getUrl('verifybvn') +"/"+bvn;//use this in production
          console.log('making request to '+url)

    this.bvnVerification = setTimeout(function(){
        const url= getUrl('users')
        const options = {
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':  USER.getLocalStorageUserData().token,
            }
        }
        axios(options)
            .then(function(response){
                if(response.status === 200) {
                    //if(response.data.message === "BVN resolved") { //uncomment this in production
                        const data = Response.data;
                        const {first_name,last_name, personal_phone,formatted_dob} = data;
                        const verifiedBvn = true;const showLoader = false
                     that.setState({
                        first_name,last_name, personal_phone,verifiedBvn,formatted_dob,showLoader
                     })
                    //}
             }

            })
        .catch(function(err){
            console.log(err)
            that.setState({showLoader:false})
        })
      },3000)
  }

  verifyBvn(e){
      const bvn = e.target.value;
    this.setState({
          bvn
      })
      const Response = {
    "status": true,
    "message": "BVN resolved",
    "data": {
        "first_name": "OSAMA",
        "last_name": "IMAFIDON",
        "dob": "06-Oct-90",
        "formatted_dob": "1990-10-06",
        "mobile": "2348164695529",
        "bvn": "3413456545"
    },
    "meta": {
        "calls_this_month": 1,
        "free_calls_left": 9
    }
}
            
      if(bvn.length !== 11) {
            if(this.bvnVerification !== undefined) {
                this.cancelBvnVerificationRequest();
            }
          return //bvn must be 11 digits long
      } 

      this.makeBvnVerificationRequest(Response,bvn); 

  }

  handleCheckBox =(e)=>{
    const value = e.target.checked;
    const name = e.target.name;
    this.setState({
        [name]:value
    })
  }

  render() {
      const correctClass = (this.state.verifiedBvn)?"col animated fadeIn":"dont-display"
      const dateClass = (!this.state.verifiedBvn)?"dont-display":"animated fadeIn";
    return(
    <div className="p-4 theme-color coporate-form">
        <div className="text-center ">
            <NavLink  to="https://giveasily.ng/" className="logo">
                <img src= {logoIcon} height="150" />
            </NavLink>
        </div>
    <Card className="coporate-form-body" >
    <CardBody>
        <div className="container">
            <h4 className="align-center">THANK YOU FOR VERIFYING YOUR E-MAIL</h4>
            <p className="align-center">You are almost done! please let us get to know you and your coporate entity</p>
            <h5 className="color-theme">About You</h5>
            <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                    <div className="col-10">         
                        <input onChange={this.verifyBvn} value={this.state.bvn} disabled={this.state.verifiedBvn} className="form-control" name="bvn" placeholder="BVN number" type="text" />
                    </div>
                    <span style={{fontSize:"20px"}} className={correctClass}><i className="lni-check-mark-circle color-green"></i></span>
            
            {this.state.showLoader && <ReactLoading type="spokes" color="#290c49" height={'3%'} width={'3%'} />}

                </div><br />
            <div className="row">
                <div className={correctClass}>
                    <input defaultValue={this.state.first_name} disabled={this.state.verifiedBvn} name="first_name" placeholder="Firstname" className="form-control"  type="text" />
                </div>
                <div className={correctClass}>
                    <input defaultValue={this.state.last_name} disabled={this.state.verifiedBvn} id="lastname" name="last_name" placeholder="Lastname" className="form-control"  type="text" />
                </div>
            </div>
            <div className={dateClass}>
                <label className="color-grey">Date of Birth</label>
                <input defaultValue={this.state.formatted_dob} disabled={this.state.verifiedBvn} type="date" className="form-control" />
            </div><br />
             <div className="row">
                <div className="col">
                    <input id="email" name="official_phone" placeholder="Official Phone" className="form-control" type="text" />
                </div>
                <div className="col">
                    <input id="personal_phone" name="personal_phone" placeholder="Personal Phone" className="form-control" type="text" />
                </div>
             </div><br />
            <div className="row">
                <div className="col">
                    <p className="color-grey-2">Is your organisations a church?</p>
                </div>
                <div className="col">
                    <div className="row">
                        <input checked={this.state.church} onChange={this.handleCheckBox} name="church" className="col-1 social-checkbox"  type="checkbox" /> 
                        <span className="col-11 color-grey-2">Yes it is</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="color-grey-2">Are you a founder or presiding pastor of a church or NGO?</p>
                </div>
                <div className="col">
                    <div className="row">
                        <input checked={this.state.founder} onChange={this.handleCheckBox} name="founder" className="col-1 social-checkbox"  type="checkbox" /> 
                        <span className="col-11 color-grey-2">Yes i am</span>
                    </div>
                </div>
            </div>
            <h5 className="color-theme">About your coporate entity</h5>
            <div className="row">
                <div className=" col-sm-6">
                    <input name="business_name" placeholder="Name of coporate Entity" className="form-control"  type="text" /> 
                </div>
                <div className=" col-sm-3">
                    <input name="abbreviated_name" placeholder="Abbreviated name if any" className="form-control"  type="text" /> 
                </div>
                <div className=" col-sm-3">
                    <input checked={this.state.ngo} onChange={this.handleCheckBox} name="ngo" className="social-checkbox"  type="checkbox" /> 
                    <span className="color-grey-2 col">Select this if you have a registered NGO in nigeria CAC/IT/NO amongst others.</span>
                </div>
            </div><br />
            <div className="row">
                <div className="col">
                    <input id="bank" name="bank" placeholder="Bank Name" className="form-control"  type="text" />
                </div>
                <div className="col">
                    <input  id="account_no" name="account_no" placeholder="Account No" className="form-control"  type="text" />
                    <small className="color-grey">Please make sure that you double check your account details. giveasily will not be held responsible for paying to 
            any inaccurate account details you specify</small>
                </div>
            </div><br />    

            <div className="row">
                <div className="col">
                    <p className="color-grey-2">What method(s) do you currently use for collecting donations?</p>
                </div>
            <div className="col">
                <select className="form-control" onChange={this.handleSelectChange} name="collection_method">
                    <option value="">--choose--</option>
                    <option value="bank">Transfer to bank account</option>
                    <option value="cash">Collection in cash</option>
                    <option value="other_platforms">Other collection platforms like giveasily</option>
                    <option value="others">Others</option>
                </select>
            </div>
        </div><br />
        <div className={this.state.otherClasses}>
            <p>Please specify the platform</p>
            <textarea name="other_methods" rows="5" cols="20" className="form-control"></textarea>
        </div><br />
        {/*<div >
            <p>Select Plan</p>
            <div className="row">
                <div className="col-9">
                    <select className="form-control" onChange={this.handleSelectChange} name="plan">
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>
                <div className="col-3">
                    <Popover
                        component="i"
                        placement="top"
                        popoverBody=""
                        className="lni-question-circle color-blue"
                    >
                        <PopoverHeader></PopoverHeader>
                        <PopoverBody>Premium plan gives you lifetime access to all of giveasily premium features. 
                            <a href="http://localhost:3001/dashboard" target="_blank">&nbsp;Learn More</a>
                        </PopoverBody>
                    </Popover>
                </div>
            </div>
    </div>
    <br />*/}
    <div className="row">
        <div className="col-sm-6">
            <p>Enter your detailed cooporate headquarters in Nigeria</p>
        </div>
        <div className="col-sm-6">
            <textarea name="coporate_address" rows="7" cols="20" placeholder="coporate Address" className="form-control"></textarea>
        </div>
    </div><br />
    <p>Which of the following platforms are you presently active on?</p>
    <div className="row">
        <div className="col-sm-2">
            <div className="row">
                <input className="col social-checkbox" checked={this.state.on_website} onChange={this.handleCheckBox} name="on_website" type="checkbox" />
                <span className="col"> Website</span>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="row">
                <input className="col social-checkbox" checked={this.state.on_mobile} onChange={this.handleCheckBox} name="on_mobile" type="checkbox" />
                <span className="col"> Mobile App</span>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="row">
                <input className="col social-checkbox" checked={this.state.on_facebook} onChange={this.handleCheckBox} name="on_facebook" type="checkbox" />
                <span className="col"> Facebook Page</span>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="row">
                <input className="col social-checkbox" checked={this.state.on_twitter} onChange={this.handleCheckBox} name="on_twitter"  type="checkbox" />
                <span className="col"> Twitter Account</span>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="row">
                <input className="col social-checkbox" checked={this.state.on_whatsapp} onChange={this.handleCheckBox} name="on_whatsapp" type="checkbox" />
                <span className="col"> WhatsApp</span>
            </div>
        </div>
    </div><br />
    <div className="text-center mb-3">
        <Button type="submit" className="btn-block z-depth-1a o-buttons">Submit</Button>
    </div>
   </form>

  </div>
  </CardBody></Card>
</div>
    )
  }
}

export default CoporateRegisteration;