import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { Container, Row, Col, Input,InputNumeric, Button, Fa, Card, CardBody, ToastContainer, toast} from 'mdbreact';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {getUrl} from '../data/urlController';
import {addUser} from '../Actions';
import {connect} from 'react-redux';
import logoIcon from '../logo/logo.png'


const mapDispatchToProps = dispatch =>{
    return {
        storeUser:user=> dispatch(addUser(user))
    }
}


class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            category:"Personal",
        };


        this.registerUser = this.registerUser.bind(this);
        this.addUserToRedux = this.addUserToRedux.bind(this);

    }


  handleChange = event => {
      console.log(event.target.value)
    this.setState({ category: event.target.value });
    this.category = event.target.value
  };

  addUserToRedux({type,payload}){
    this.props.storeUser({type,payload});
    //this.props.history.push('/dashboard')

}

  registerUser(e) {
      e.preventDefault()
      const first_name = e.target.firstname.value
      const last_name = e.target.lastname.value;
      const email = e.target.email.value;
      const category = this.category;
      const confirm_password =  e.target.confirm_password.value;
      const password = e.target.password.value;
      if(password !== confirm_password) {
          alert("your password does not match");
          return;
      }
      const url = getUrl('registeration');
      const body = {
          first_name,last_name,email,category,password
      }
      const that = this;
      axios.post(url,body)
        .then(function(response){
            if(response.status === 200) {
                 console.log(response);
                 const data = response.data

                 if(data.title === 'success') {
                     const type = 'addUser';
                     const payload = data;
                     that.addUserToRedux({type,payload})
                     that.props.history.push('/dashboard')
                }
            }

        })
        .catch(function(err){
            console.log(err)
        })
  }

    notify(type){
  return () => {
    switch (type) {
      case 'info':
        toast.info('Info message', {
          autoClose: 3000
        });
        break;
      case 'success':
        toast.success('Success message', {
          position: "top-right",
        });
        break;
      case 'warning':
        toast.warn('Warning message');
        break;
      case 'error':
        toast.error('Error message');
        break;
    }
  };
};


render() {
    return (
        <div className="o-center-card bg-theme">
            <div className="text-center">
                <NavLink  to="https://giveasily.ng/" className="logo">
                    <img src={logoIcon} height="150" />
                </NavLink>
            </div>    

             {/*<Container>*/}
            <Card className="o-prep-card">
              <CardBody>
                <form  onSubmit={this.registerUser}>
                  <p className="h4 text-center color-theme">Sign up</p>
                  <div className="grey-text">
                    <Input className="m-0" label="Firstname" name="firstname"  group type="text" validate error="wrong" success="right"/>
                    <Input className="m-0" label="Lastname" name="lastname"  group type="text" validate error="wrong" success="right"/>
                    <Input className="m-0" label="Your email" name="email"  group type="email" validate error="wrong" success="right"/>
                    <Input className="m-0" label="Password" name="password"  group type="password" validate/>
                    <Input className="m-0" label="Confirm Password" name="confirm_password"  group type="password" validate/>

                      <Select 
                        value={this.state.category}
                        onChange={this.handleChange}                       
                        style={{width:"100%"}}
                        icon="envelope"
                    >
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="coporate">Coporate</MenuItem>
                    </Select>
                    <label>Personal or Coporate</label>
                  </div>
                  <div className="text-center mt-3">
                  <Button className="o-sidebar-header" type="submit" gradient="blue" className="btn-block z-depth-1a o-buttons">Register</Button>
                </div>
                </form>
              </CardBody>
            </Card>
      {/*</Container>*/}
            {/*<React.Fragment>
        <button className='btn btn-info' onClick={this.notify('info')}>Info</button>
        <button className='btn btn-success' onClick={this.notify('success')}>Success</button>
        <button className='btn btn-warning' onClick={this.notify('warning')}>Warning</button>
        <button className='btn btn-danger' onClick={this.notify('error')}>Error</button>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </React.Fragment>*/}
        </div>
    )
}
}

export default connect(null,mapDispatchToProps)(Register);