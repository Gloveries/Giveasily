import React, { Component } from 'react';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
// style={{display:"flex", justifyContent:"center", alignItems:"center"}}
import axios from 'axios'
import {getUrl} from '../data/urlController';
import {addUser} from '../Actions';
import {connect} from 'react-redux';

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
    alert(JSON.stringify(type))
    this.props.storeUser({type,payload});
    this.props.history.push('/dashboard')

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
                if(data.title = 'success') {
                const type = 'addUser';
                const payload = data;
                
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
            <div >
                <div style={{margin:"0 auto"}}>
            <Container style={{padding:"20px"}}>
        <section className="form-elegant">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5"><strong>Sign in</strong></h3>
                  </div>
                  <form onSubmit={this.loginUser}>
                  <Input label="Your email" group type="email" name="email" validate error="wrong" required success="right"/>
                  <Input label="Your password" group type="password" name="password" validate required containerClass="mb-0"/>
                  <p className="font-small blue-text d-flex justify-content-end pb-3">Forgot<a href="#" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <Button rounded style={{backgroundImage:" linear-gradient(to right, #008aec , #015095)"}} type="submit" gradient="blue" rounded className="btn-block z-depth-1a">Sign in</Button>
                  </div>
                  </form>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
                  <div className="row my-3 d-flex justify-content-center">
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="facebook" className="blue-text text-center" /></Button>
                    <Button type="button" color="white" rounded className="mr-md-3 z-depth-1a rounded-border"><Fa icon="twitter" className="blue-text" /></Button>
                    <Button type="button" color="white" rounded className="z-depth-1a rounded-border"><Fa icon="google-plus" className="blue-text" /></Button>
                  </div>
                </CardBody>
                <ModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" className="blue-text ml-1"> Sign Up</a></p>
                </ModalFooter>
              </Card>
              {/*<Button onClick={this.handleAdd}>store user </Button>*/}
        </section>
      </Container>
      </div>
      </div>
        )
    }
}

export default connect(null,mapDispatchToProps)(Login);