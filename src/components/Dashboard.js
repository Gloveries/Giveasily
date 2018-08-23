import React, { Component } from 'react'
// import { Box } from 'reactjs-admin-lte';
import Sidebar from "react-sidebar";
import Header from './Header';
import AddIcon from '@material-ui/icons/Add';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Company from './Company'
import Main from '../util/dashboard/Main';
import {DashboardChart, SidebarTopContent, EmailConfirmationOverlay} from '../util/dashboard/utils';
import AppSettings from '../util/dashboard/Settings'
import Donations from '../util/dashboard/Donations';
import {addDonation, addUser} from '../Actions';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addDonation:donation=>dispatch(addDonation(donation)),
        addUser:user=>dispatch(addUser(user))
    }
}

const mql = window.matchMedia(`(min-width: 900px)`);
const data = [
  {
    label: "Series 1",
    data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
  },
  {
    label: "Series 2",
    data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
  },
  {
    label: "Series 3",
    data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
  }
];

const sideBarMenu = (
    <div style={{ "paddingLeft": "5px" }}>
        <div><br />
            <NavLink to='/show' >
                <img src="assets/img/logo.png" alt="" width="140" />
            </NavLink><br /><br />
            <p>ID 113350 </p>
            <hr /><br /><br />
            <div>
                <div>
                    <p className="green o-sidebar-header">TRANSACTION</p><br />
                    <ul className="o-nav-ul">
                        <NavLink to='/company'><li>Donations</li></NavLink><br />
                        <NavLink to ='/donations'><li>Pledges</li></NavLink><br />
                    </ul>
                </div><br />
                {/*end*/}
                <div>
                    <h3 className="green o-sidebar-header">PLEDGES</h3><br />
                    <ul className="o-nav-ul">
                        <NavLink to='/'><li>Your Pledges</li></NavLink><br />
                        <NavLink to='/'><li>Your Pledgers</li></NavLink><br />
                    </ul>
                </div><br />
                <div>
                    <h3 className="green o-sidebar-header">SETTINGS</h3><br />
                    <ul className="o-nav-ul">
                        <NavLink to='/'><li>User settings</li></NavLink><br />
                        <NavLink to='/'><li>Account settings</li></NavLink><br />
                    </ul>
                </div><br />                
            </div>
        </div>
    </div>
)

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            mql:mql,
            chart:false,
            data:data,
            completed:100,
            settings:false,
            blockDashboard:false,
            email:'osamaimafidon@gmaill.com'
        };

        console.log(this.props.user)

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }


    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    handleSidebar = ()=>{
        this.setState({
            sidebarOpen:!this.state.sidebarOpen
        })
    }

    onSetSidebarOpen(open) {
        console.log(open);
        // if(typeof open === 'Boolean') return;
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    render() {
        return (
<div>
    {/*<div style={{background:"rgba(0,0,0,0.8)",width:"100%",height:"100%",position:"absolute",zIndex:"1222334444444"}}>
    </div>*/}
            {this.props.user.completed_registeration && <EmailConfirmationOverlay blockDashboard={this.state.blockDashboard} email={this.state.email} />}

                {/*<div style={{position:"absolute", zIndex:"109029800"}}><LinearProgress variant="determinate" value={this.state.completed} /></div>*/}

    <Sidebar
        sidebar={sideBarMenu}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{sidebar: { background:"#290c49", width: "200px", top: "0px", paddingLeft: "5px",color:"white",position:"absolute" },
        content:{background:"#f5f5f5"}}}> 
        <br />

        <SidebarTopContent handleSidebar={this.handleSidebar} sidebarDocked={this.state.sidebarDocked}/>
            <Main  />
            <br /><br /><br />
            {/*<button onClick={
                (e)=>{e.preventDefault();this.props.addDonation({type:"addDonation", payload:{name:"e",amount:2} })}
            }>click me</button>{console.log(this.props)}*/}
            {/*{this.state.chart && <DashboardChart chartData={this.state.data} />}<br /><br />*/}

            {/*{this.settings && <div className="container"><AppSettings /></div>}*/}

            {/*<div className="container"><Donations /></div>*/}


    </Sidebar>
</div>
    
        )}
}



export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);