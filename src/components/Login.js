import React, { Component } from 'react';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getUrl} from '../data/urlController';
import {addUser} from '../Actions';
import {connect} from 'react-redux';
import USER from '../data/userData'
import logoIcon from '../logo/logo.png'



const mapDispatchToProps = dispatch =>{
    return {
        storeUser:user=> dispatch(addUser(user))
    }
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.loginUser = this.loginUser.bind(this);
        this.addUserToRedux = this.addUserToRedux.bind(this)
    }

addUserToRedux({type,payload}){
    // alert(JSON.stringify(type))
    this.props.storeUser({type,payload});
    this.props.history.push('/')

}
    loginUser(e) {
        e.preventDefault();
        const that = this;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = getUrl('login');
        const body = {
            email,password
        }
        axios.post(url,body)
            .then(function(response){
                const data = response.data;
                if(data.title === 'success') {
                const type = 'addUser';
                const payload = data;
                USER.setLocalStorageUserData(data)
                console.log(payload)
                that.addUserToRedux({type,payload})
            }
            
            console.log(response.data)

            })
            .catch(function(err) {
                console.log(err)
            })

    }

    render() {
        return (
            <div className="bg-theme" >
                <div className="text-center ">
                    <NavLink  to="https://giveasily.ng/" className="logo">
                        <img src={logoIcon} height="150" />
                    </NavLink>
                </div>
              <Card className="login-card">
                <CardBody  className="mx-4">
                  <div className="text-center">
                    <h5 className="color-theme "><strong>SIGN IN</strong></h5>
                  </div><br />
                  <form onSubmit={this.loginUser}>
                  <Input style={{padding:"0px"}} label="Your email" group type="email" name="email" validate error="wrong" required success="right"/>
                  <Input style={{padding:"0px"}} label="Your password" group type="password" name="password" validate required containerClass="mb-0"/>
                  <p className="font-small blue-text d-flex justify-content-end pb-3"><a href="#" className="blue-text ml-1">Forgot Password?</a></p>
                  <div className="text-center mb-3">
                    <Button type="submit" gradient="blue" className="btn-block z-depth-1a o-buttons">Sign in</Button>
                  </div>
                  </form>
                  {/*<p className="font-small dark-grey-text text-right d-flex justify-content-center"> or Sign in with:</p>
                  <div className="row d-flex justify-content-center">
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="facebook" className="blue-text text-center" /></Button>
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="twitter" className="blue-text" /></Button>
                    <Button type="button" color="white" rounded className="z-depth-1a rounded-border"><Fa icon="google-plus" className="blue-text" /></Button>
                  </div>*/}
                </CardBody>
                <ModalFooter className="mx-5 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">Not a member? <NavLink to="/register" className="blue-text ml-1"> Sign Up</NavLink></p>
                </ModalFooter>
              </Card>
              {/*<Button onClick={this.handleAdd}>store user </Button>*/}
                {/*<button ><NavLink to="/registeration/coporate">go</NavLink></button>*/}
      </div>
        )
    }
}

export default connect(null,mapDispatchToProps)(Login);