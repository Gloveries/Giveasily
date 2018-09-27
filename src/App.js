import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import {EmailConfirmationOverlay} from './util/dashboard/utils';
import PledgesUnredeemed from './components/PledgesUnredeemed';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sidebar from 'react-sidebar';

import {MainContent} from './util/dashboard/MainContent';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import {SideBarMenu} from './util/dashboard/utils';
import {SidebarTopContent} from './util/dashboard/utils'
// import logoIcon from '../logo/logo.png';

import Login from "./components/Login"
const mql = window.matchMedia(`(min-width: 900px)`);


class App extends Component {
constructor(props) {
  super(props);
          this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            mql:mql,
            chart:false,
            completed:100,
            settings:false,
            blockDashboard:false,
            contents:{
                main:true,
                donations:false,
                pages:false,
                users:false
            },
            user:{}
        };

  this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
}

componentDidMount(){
          mql.addListener(this.mediaQueryChanged);

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
    
    <BrowserRouter>
    <div>
                <Switch>
            <Route exact path="/lg" component={Login} />

        </Switch>
        <div style={{display:"none"}}>
        <Sidebar
          sidebar={<SideBarMenu />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{sidebar: { background:"#290c49", width: "220px", top: "0px", paddingLeft: "5px",color:"white",position:"absolute" },
          content:{background:"#f0f0f0",marginTop:"2px"}}}> 
          <SidebarTopContent handleSidebar={this.handleSidebar} sidebarDocked={this.state.sidebarDocked}/>
        
            <MainContent />
      </Sidebar>
      </div>
        <div className="p-2 bg-theme color-white cursor-pointer" style={{display:"inline", borderRight:"1px solid #555"}}>
                    report an issue
        </div>
  
                </div>      
      </BrowserRouter>

    );
  }
}

export default App;
