import React, { Component } from 'react'
import {Button, Fa, Card, CardBody} from 'mdbreact';
import {getUrl} from '../data/urlController';
import axios from 'axios';
import ReactLoading from 'react-loading'




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
      on_website:false
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
      console.log(e.target.value)
      this.collectionMethod = e.target.value;
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

  handleFormSubmit(e) {
      e.preventDefault();
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const bvn = this.state.bvn;
      const formatted_dob = this.state.formatted_dob;
      const official_phone = e.target.official_phone.value;
      const personal_phone = e.target.personal_phone.value;
      const founder = this.state.founder;
      const ngo = this.state.ngo;
      const name_of_organisation = e.target.name_of_organisation.value;
      const abbreviated_name = e.target.abbreviated_name.value;
      const other_methods = e.target.other_methods.value;
      const other_platforms = this.collectionMethod;
      const coporate_address = e.target.coporate_address.value;
      const on_website = this.state.on_website;
      const on_facebook = this.state.on_website;
      const on_twitter = this.state.on_twitter;
      const on_whatsapp = this.state.on_whatsapp
      const on_mobile = this.state.on_mobile;

      const body = {
                    first_name,last_name,official_phone,personal_phone,founder,bvn,formatted_dob,
                    name_of_organisation,abbreviated_name,other_methods,other_platforms,ngo,
                    coporate_address,on_website,on_twitter,on_facebook,on_whatsapp,on_mobile
                   }
      console.log(body)
    
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

    const url = getUrl('verifybvn') +"/"+bvn;
          console.log('making request to '+url)

    this.bvnVerification = setTimeout(function(){
        axios.get("http://localhost:3000/api/v1/users")
            .then(function(response){
                if(response.status === 200) {
                    //if(response.data.message === "BVN resolved") {
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
            this.setState({showLoader:false})
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
      const loaderClass =(this.state.verifiedBvn || this.state.timeout || !this.state.startLoader)?"dont-display":""
    return(
<div className="p-4 theme-color coporate-form">
  <div className="container align-center">
      <img src="assets/img/sam_img/favicon.ico" alt="logo" width="50" height="50" />
  </div><br />
    <Card className="coporate-form-body" ><CardBody>
  <div className="container">
    <h4 className="align-center">THANK YOU FOR VERIFYING YOUR E-MAIL</h4>
    <p className="align-center">You are almost done! please let us get to know you and your coorate entity</p>
    <h3 className="color-grey ">About You</h3>
    <form onSubmit={this.handleFormSubmit}>
     <div className="row">
         <div className="col-10">         
             <input onChange={this.verifyBvn} value={this.state.bvn} disabled={this.state.verifiedBvn} className="form-control" name="bvn" placeholder="BVN number" type="text" />
         </div>
         <span style={{fontSize:"20px"}} className={correctClass}><i className="lni-check-mark-circle color-green"></i></span>
            
            {this.state.showLoader && <ReactLoading type="spokes" color="#290c49" height={'3%'} width={'3%'} />}

     </div>
     <div className="row">
        <div className={correctClass}>
            <input defaultValue={this.state.first_name} disabled={this.state.verifiedBvn} id="firstname" name="first_name" placeholder="Firstname" className="form-control"  type="text" />
        </div>
        <div className={correctClass}>
            <input defaultValue={this.state.last_name} disabled={this.state.verifiedBvn} id="lastname" name="last_name" placeholder="Lastname" className="form-control"  type="text" />
        </div>
    </div>
    <div className={dateClass}>
        <label>Date of Birth</label>
        <input defaultValue={this.state.formatted_dob} disabled={this.state.verifiedBvn} type="date" className="form-control" />
    </div>
    <div className="row">
        <div className="col">
            <input id="email" name="official_phone" placeholder="Official Phone" className="form-control" type="text" />
        </div>
        <div className="col">
            <input id="personal_phone" name="personal_phone" placeholder="Personal Phone" className="form-control" type="text" />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <p>Are you a founder or presiding pastor of a church or NGO?</p>
        </div>
        <div className="col">
            <div className="row">
            <input checked={this.state.founder} onChange={this.handleCheckBox} name="founder" className="form-control col-1"  type="checkbox" /> 
            <span className="col-11">YES I AM</span>
            </div>
        </div>
    </div>
    <h3 className="color-grey ">About your coporate entity</h3>
    <div className="row">
        <div className=" col-sm-6">
            <input name="name_of_organisation" placeholder="Name of coporate Entity" className="form-control"  type="text" /> 
        </div>
        <div className=" col-sm-3">
            <input name="abbreviated_name" placeholder="Abbreviated name if any" className="form-control"  type="text" /> 
        </div>
        <div className=" col-sm-3">
            <input checked={this.state.ngo} onChange={this.handleCheckBox} name="ngo" className="form-control"  type="checkbox" /> 
            <span className="color-grey col">Select this if you have a registered NGO in nigeria CAC/IT/NO amongs others.</span>
        </div>
    </div><br />
    <div className="row">
        <div className="col">
            <p>What method(s) do you currently use for collecting donations?</p>
        </div>
        <div className="col">
            <select onChange={this.handleSelectChange} name="collection_method">
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
    </div>
    <div className="row">
        <div className="col-sm-6">
            <p>Enter your detailed cooporate headquarters in Nigeria</p>
        </div>
        <div className="col-sm-6">
            <textarea name="coporate_address" placeholder="coporate Address" className="form-control"></textarea>
        </div>
    </div>
    <h5>Which of the following platforms are you presently active on?</h5>
    <div className="row">
        <div className="col-sm-2">
            <div className="row">
                <input checked={this.state.on_website} onChange={this.handleCheckBox} name="on_website" className="form-control col" type="checkbox" />
                <span className="col"> Website</span>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="row">
                <input checked={this.state.on_mobile} onChange={this.handleCheckBox} name="on_mobile" className="form-control col" type="checkbox" />
                <span className="col"> Mobile App</span>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="row">
                <input checked={this.state.on_facebook} onChange={this.handleCheckBox} name="on_facebook" className="form-control col" type="checkbox" />
                <span className="col"> Facebook Page</span>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="row">
                <input checked={this.state.on_twitter} onChange={this.handleCheckBox} name="on_twitter" className="form-control col" type="checkbox" />
                <span className="col"> Twitter Account</span>
            </div>
        </div>
        <div className="col-sm-2">
            <div className="row">
                <input checked={this.state.on_whatsapp} onChange={this.handleCheckBox} name="on_whatsapp" className="form-control col" type="checkbox" />
                <span className="col"> WhatsApp</span>
            </div>
        </div>
    </div><br />
    <div className="text-center mb-3">
        <Button type="submit" className="btn-block z-depth-1a o-buttons">Sign in</Button>
    </div>
   </form>

  </div>
  </CardBody></Card>
</div>
    )
  }
}

export default CoporateRegisteration;