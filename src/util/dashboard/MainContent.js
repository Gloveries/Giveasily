import React from 'react'
import Pages from '../../components/Pages';
import ViewPage from '../../components/ViewPage';
import FundingSources from '../../components/FundingSources';
import Main from '../../util/dashboard/Main';
import Donations from '../../components/Donations';
import Dashboard from '../../components/Dashboard';
import Register from '../../components/Register';
import Login from '../../components/Login'
import GlobalAdmin from '../../components/GlobalAdmin';
import CoporateRegisteration from '../../components/Coporate_Registeration';
import {Switch, Route, NavLink } from 'react-router-dom';
import VerifyCoporateUser from '../../components/VerifyCoporateUser';


export const MainContent = ()=>{

    return (
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/donations" component={Donations} />
            <Route path="/users" component={VerifyCoporateUser} />
            <Route exact  path="/pages" component={Pages} />
            <Route path='/pages/:id/:slug' component={ViewPage} />
            <Route path='/funding' component={FundingSources} />
            <Route path="/registeration/coporate" component={CoporateRegisteration} />
        </Switch>
    )
}