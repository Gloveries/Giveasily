import React, { Component } from 'react'
import {Button, Fa, Card, CardBody} from 'mdbreact';




class CoporateRegisteration extends Component {
   constructor(props) {
    super(props);
    this.state = {
      formActivePanel3: 1,
      formActivePanel3Changed: false,
    }
  }

  handleSelectChange(e){
      console.log(e.target.value)
  }

  render() {
      const otherClasss = "animated fadeIn"
    return(
<div className="p-4 theme-color coporate-form">
  <div className="container align-center">
      <img src="assets/img/sam_img/favicon.ico" alt="logo" width="50" height="50" />
  </div>
    <Card style={{width:"70%", margin:"0 auto"}} ><CardBody>
  <div className="container">
    <h4 className="align-center">THANK YOU FOR VERIFYING YOUR E-MAIL</h4>
    <p className="align-center">You are almost done! please let us get to know you and your coorate entity</p>
    <h5 className="color-grey ">About You</h5>
    <form>
     <div className="row">
        <div className="col">
            <input id="email" name="first_name" placeholder="Firstname" className="form-control" required="true" value="" type="text" />
        </div>
        <div className="col">
            <input id="phoneNumber" name="last_name" placeholder="Lastname" className="form-control" required="true" value="" type="text" />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <input id="email" name="official_phone" placeholder="Official Phone" className="form-control" required="true" value="" type="text" />
        </div>
        <div className="col">
            <input id="personal_phone" name="personal_phone" placeholder="Personal Phone" className="form-control" required="true" value="" type="text" />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <p>Are you a founder or presiding pastor of a church or NGO?</p>
        </div>
        <div className="col">
            <div className="row">
            <input name="personal_phone" className="form-control col-1"  type="checkbox" /> 
            <span className="col-11">YES I AM</span>
            </div>
        </div>
    </div>
    <h5 className="color-grey ">About your coporate entity</h5>
    <div className="row">
        <div className=" col-sm-6">
            <input name="name_of_organisation" placeholder="Name of coporate Entity" className="form-control"  type="text" /> 
        </div>
        <div className=" col-sm-4">
            <input name="abbreviated_name" placeholder="Abbreviated name if any" className="form-control"  type="text" /> 
        </div>
        <div className=" col-sm-2">
            <input name="personal_phone" className="form-control"  type="checkbox" /> 
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
    <div className={otherClasss}>
        <p>Please specify the platform</p>
        <textarea name="other_methods" rows="5" cols="20" className="form-control"></textarea>
    </div>
    <div className="row">
        <div className="col">
            <p>Enter your detailed cooporate headquarters in Nigeria</p>
        </div>
        <div className="col">
            <textarea name="coporate_address" placeholder="coporate Address" className="form-control"></textarea>
        </div>
    </div>
    <h5>Which of the following platforms are you presently active on?</h5>
    <div className="row">
        <div className="col">
            <div className="row">
                <input name="on_website" className="form-control col" type="checkbox" />
                <span className="col"> Website</span>
            </div>
        </div>
        <div className="col">
            <div className="row">
                <input name="on_mobile" className="form-control col" type="checkbox" />
                <span className="col"> Mobile App</span>
            </div>
        </div>
        <div className="col">
            <div className="row">
                <input name="on_facebook" className="form-control col" type="checkbox" />
                <span className="col"> Facebook Page</span>
            </div>
        </div>
        <div className="col">
            <div className="row">
                <input name="on_twitter" className="form-control col" type="checkbox" />
                <span className="col"> Twitter Account</span>
            </div>
        </div>
        <div className="col">
            <div className="row">
                <input name="on_whatsapp" className="form-control col" type="checkbox" />
                <span className="col"> WhatsApp</span>
            </div>
        </div>
    </div>
   </form>

  </div>
  </CardBody></Card>
</div>
    )
  }
}

export default CoporateRegisteration;