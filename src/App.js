import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login'
import GlobalAdmin from './components/GlobalAdmin';
import CoporateRegisteration from './components/Coporate_Registeration'
import {EmailConfirmationOverlay} from './util/dashboard/utils';
import PledgesUnredeemed from './components/PledgesUnredeemed';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Donations from './components/Donations';
import VerifyCoporateUser from './components/VerifyCoporateUser';
import Pages from './components/Pages';
import ViewPage from './components/ViewPage';
import FundingSources from './components/FundingSources';
class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/tabled" component={Donations} />
            <Route path="/users" component={VerifyCoporateUser} />
            <Route exact  path="/pages" component={Pages} />
            <Route path='/pages/:id/:slug' component={ViewPage} />
            <Route path='/funding' component={FundingSources} />
            <Route path="/registeration/coporate" component={CoporateRegisteration} />
            
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
