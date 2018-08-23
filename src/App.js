import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Company from './components/Company';
import Header from './components/Header'
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login'
import TabsPage from './components/select';
import GlobalAdmin from './components/GlobalAdmin';
import CoporateRegisteration from './components/Coporate_Registeration'
import {EmailConfirmationOverlay} from './util/dashboard/utils';


import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route  path="/company" component={Company} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={CoporateRegisteration} />


            {/*<Route path="/client/workshops" component={ClientWorkshop} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/workshops" component={Workshops} />
            <Route path="/workshops/:workshopId/applicants" component={Applicants}/>
            <Route exact path="/workshops/:workshopId" component={Workshops} />

            <Route path="/answers/:questionId" component={PostAnswer} />
            <Route path="/postquestion" component={PostQuestion} />*/}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
