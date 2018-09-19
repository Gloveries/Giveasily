import React from 'react';
// import AddIcon from '@material-ui/icons/Add';
// import HamburgerIcon from '@material-ui/icons/Menu';
//card imports
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import PersonPin from '@material-ui/icons/PersonPin';
// import ReactLoading from 'react-loading';
import { NavLink } from 'react-router-dom';

import '../../css/index.css'
//end card import
//react-chart
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";
//end react-chart
import Settings from '@material-ui/icons/Settings';
import HamburgerIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import DatePicker from 'react-datepicker';
import ExpandMore from '@material-ui/icons/ExpandMore'
import 'react-datepicker/dist/react-datepicker.css';

export const TopCard =({anchorEl,purpose,handleClose,handleClick,handleTopCardClick,display_texts,dropdown_text,result})=>{
 const value = result?result:"Loading..."
 return (
<div className="card">
  <div className="card-body">
    <h6  className="card-title">
        <span>
            <span className="theme-color" onClick={handleClick}> {dropdown_text}<ExpandMore className="float-right" /></span>
                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    {
                         display_texts.map((T,i)=>
                             <MenuItem key={i} onClick={e=>{handleTopCardClick(T)}}>{T}</MenuItem>
                         )
                    }
                </Menu>
            </span>            
    </h6>
        <h1  className="card-text"><PersonIcon /> | <b>{value}</b></h1><br />

    <small className="card-subtitle mb-2 theme-color small"> {purpose}</small>

  </div>
  {/*<ReactLoading type="spokes" color="#888" height={'20%'} width={'20%'} />*/}
</div>
)}

export const EmailConfirmationOverlay = ({blockDashboard, email})=>{

const classChoice = (!blockDashboard)?"block-dashboard":"dont-display"
  return (
    <div className={classChoice}>
    <div id="email-confirmation-overlay" className="p-3" >
     <div className="account-pages"></div>
            <div className="clearfix"></div>
            <div className="wrapper-page">
                <div className="text-center">
                    <NavLink  to="https://giveasily.ng/" className="logo">
                        <img  src="assets/img/sam_img/favicon.ico" height="50" />
                    </NavLink>
                </div><br />
                
                <div className="m-t-40 card-box">
                    <div className="text-center">
                        <h4 className="text-uppercase font-bold m-b-0 color-white">Confirm Email</h4>
                    </div>
                    <div className="panel-body text-center">
                        <img  src="assets/img/sam_img/mail_confirm.png" alt="img" height="100" className="thumb-lg m-t-20 center-block" />
                        <p className="font-13 m-t-20 color-white">An email has been sent to&nbsp;&nbsp; 
                            <span className="color-blue" id="cemail">{email}</span> Please Click on the included link to activate your account.</p>                </div>
                </div>

                
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p className="color-white">Already have an account?
                            <NavLink  to="/login" className="text-white m-l-5">
                            <span className="color-blue">&nbsp;Login</span>
                            </NavLink>
                        </p>
                    </div>
                </div>

        </div>
    </div>
</div>
)}

export const BottomBoxes = ()=>(
  <div style={{ display: "flex", justifyContent: "space-between" }} className="p-3" >
    <div className="bottom-cards">
      <div className="modify-icon-size"><i className="lni-hand"></i></div><br />
      <div style={{ alignItems: "center", fontSize: "1.5em" }}>Make a pledge</div>
    </div>
    <div className="bottom-cards bg-purple">
      <div className="modify-icon-size"><i className="lni-gift"></i></div><br />
      <div style={{ alignItems: "center", fontSize: "1.5em" }}>Schedule a gift</div>
    </div>
    <div className="bottom-cards bg-theme">
      <div className="modify-icon-size"><i className="lni-mastercard"></i></div><br />
      <div style={{ alignItems: "center", fontSize: "1.5em" }}>Funding sources</div>
    </div>
  </div>
)

export const Filter =()=>(
<div style={{width:"50px"}} className="btn-group filter" role="group" aria-label="Basic example">
  <input  style={{borderRadius:"1px"}}  type="button" value="one   V" className="btn btn-primary"/>
  <input type="date"  className="btn btn-secondary"/>
  <input  type="date"  className="btn btn-secondary"/>
  <input style={{borderRadius:"1px", background:"#290c49"}} type="button" value="export" className="btn btn-secondary"/>
</div>
)

export const DashboardChart = ({chartData})=>{
  return (
  <Chart data ={chartData}>
    <Axis primary type="time" />
    <Axis type="linear" />
    <Series type={Line} />
  </Chart>
)}

export const SidebarTopContent = ({sidebarDocked,handleSidebar})=>(
<div  className="p-4" >
  <span  style={{ paddingLeft: "4%", "visibility": (!sidebarDocked) ? 'visible' : "hidden" }}>
    <HamburgerIcon onClick={handleSidebar}  /></span>
  <span style={{ float: "right" }}><Settings /></span>
</div>
)

export const QueryTransactions =(props)=>{
      
const {buttonText,anchorEl, handleClick, handleDonateClose, handlePledgeClose, startDate,handleClose,handleDateChange,handleExportClick} = props;
  return (
 <div  className="query-transactions">
    <form className="query-transactions__form">
       <FormControl >
          <Button
             aria-owns={anchorEl ? 'simple-menu' : null}
             aria-haspopup="true"
             onClick={handleClick}
             style={{ borderRadius: "0px", background: "green",color:"white",width:"10px",paddingLeft:"35px",paddingRight:"35px"}}
            >
              {buttonText} <i className="lni-chevron-down ml-4"></i>
          </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleDonateClose}>DONATE</MenuItem>
                                <MenuItem onClick={handlePledgeClose}>PLEDGE</MenuItem>
                            </Menu>
                        </FormControl>
                        <FormControl >
                            <DatePicker dayClassName={()=>"calender-day"} className="calender-popper" calendarClassName="calender" selected={startDate} onChange={handleDateChange} placeholderText="Start date" />
                        </FormControl>
                        <FormControl>
                            <DatePicker selected={startDate} className="calender-popper" onChange={handleDateChange} placeholderText="End date" />
                        </FormControl>
                        <FormControl>
                            {/*<div style={{marginBottom:"10px"}} className="bg-theme p-4">Export</div>*/}
                            <Button onClick={handleExportClick} style={{ borderRadius: "0px", background: "#290c49", color: "white", width:"10px" }}>EXPORT</Button>
                        </FormControl>
                    </form>

                </div>
  )
}

export const ChevronSelect =(props)=>{
    const {anchorEl,handleClose,handleClick, handleTopCardClick,display_texts,dropdown_text} = props;
    console.log(props)
    return(

        <span>
            <span onClick={handleClick}>  drop {dropdown_text} <i className="lni-chevron-down ml-4"></i></span>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >   {
                                    display_texts.map((T,i)=>{
                                        return (
                                           <MenuItem key={i} onClick={()=>{handleTopCardClick(T)}}>{T}</MenuItem>

                                        )
                                    })

                                }
                            </Menu>
            </span>

    )
}