import React, { Component } from 'react';

const Footer = (props)=>(
<div>
        <footer className="m-b-30">
    <div className="container">
        <div className="row">
            <div style={{"line-height":"20px"}} className="col-md-4">
                <h4 style={{"font-size":"16px","color":"#1E0E3C"}}> <b className="m-b-20">Solutions</b> </h4>
                <p className="m-t-20"><a href="#/product/invoicing">Pledge Tracking</a></p>
                <p><a href="#/product/payments">Recurring Giving</a></p>
                <p><a href="#/product/transfers">Save2Give</a></p>
                <p><a href="#/product/dashboard">Give ‘n’ Earn</a></p>
                <p><a href="#/product/checkout">Volunteer Mgt. Tool</a></p>
                <p><a href="#/bots">Membership Mgt. Tool</a></p>
                <p><a href="#/bots">Giveathron</a></p>
                <p><a href="#/bots">Developer Tools</a></p>
            </div>

            <div style={{"line-height":"20px"}} className="col-md-4">
                <h4 style={{"font-size":"16px","color":"#1E0E3C"}}><b className="m-b-20"> Company </b></h4>
                <p className="m-t-20"><a href="pricing.html">Pricing</a></p>
                <p><a href="https://#" target="_blank">Blog</a></p>
                <p><a href="#/brand">Brand</a></p>
                <p><a href="#/support">Support</a></p>
                <p className="m-t-20"><a href="https://#/" target="_blank">Documentation</a></p>
                <p><a href="https://#/overview" target="_blank">API Reference</a></p>
                <p><a href="http://#" target="_blank">API Status</a></p>
                <p><a href="https://github.com/#" target="_blank">Open Source</a></p>
            </div>

            <div style={{"line-height":"20px"}}  className="col-md-4">
                <a href="../index.html" className="logo">
                <img src="get-started/templates/giveasily/assets/images/logo-blue.png" height="25" />
                </a> <br /><br />
                <p>113, Allen Avenue, Ikeja GRA, Lagos, Nigeria.</p>
                <p className="m-t-20">Our Office Address:</p>
                    <p>+234 (0) 703 620 1650 </p>
                    <p>+234 (0) 809 775 7937</p>
                    <p>+234 (0) 805 027 6578 </p>
                    <p><a href="mailto:support@giveasily.com">support@giveasily.com</a></p>
                    <p style={{"font-size":"22px","color":"#1E0E3C","padding-top":"10px"}}>
                        <a href="http://facebook.com"><i className="zmdi zmdi-facebook"></i></a> 
                        <a href="http://twitter.com"><i className="zmdi zmdi-twitter"></i></a> 
                        <a href="http://instagram.com"> <i className="zmdi zmdi-instagram"></i></a>
                        <a href="http://github.com"><i className="zmdi zmdi-github"></i></a> 
                    </p>

            </div>
        </div>
    </div>
</footer>
<br />
<br />

<section id="copyright">
    <div className="Grid Grid--gutters Grid--cols-2 u-textCenter">
        <div className="Grid-cell footertext">
            <div className="Demo"></div> Giveasily - A product of Gloveries Business Solutions Ltd. <br/> © 2018, All Rights Reserved.</div>
        <div className="Grid-cell footerlogo">
            <div className="Demo"></div>
            <img src="assets/img/SecureFooter/footericons.png" alt="" /> 
        </div>
    </div>
</section>
</div>
)

export default Footer;