import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (    <header id="header-wrap">
      {/*Navbar Start*/}
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar indigo">
        <div className="container padded">
          {/*Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span className="icon-menu"></span>
              <span className="icon-menu"></span>
              <span className="icon-menu"></span>
            </button>
            <a href="index.html" className="navbar-brand padded"><img src="assets/img/logo.png" alt="" width="160" /></a>
          </div>
          <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mr-auto w-100 justify-content-left clearfix">
            {/*I Commnted this out to prevent showing of left menu items 
             <li className="nav-item active">
                <a className="nav-link" href="#hero-area">
                  Home
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#hero-area">
                  Home
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#hero-area">
                  Home
                </a>
              </li>*/}
            </ul> 
            <div className="dropdown" id="dropdown">
           <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"> Solutions</button>
          <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Pledge Tracking</a>
          <a className="dropdown-item" href="#">Recurring Giving</a>
          <a className="dropdown-item" href="#">Save2Give</a>
          <a className="dropdown-item" href="#">Give ‘n’ Earn</a>
          <a className="dropdown-item" href="#">Volunteer Mgt. Tool</a>
          <a className="dropdown-item" href="#">Membership Mgt. Tool</a>
          <a className="dropdown-item" href="#">Giveathron</a>
          <a className="dropdown-item" href="#">Developer Tools</a>
          </div>
          </div>

          <div className="btn float-right">
              <a className="nav-item" rel="nofollow" href="get-started/pricing.html">Pricing</a>
            </div>

            <div className="btn float-right">
              <a className="nav-item" rel="nofollow" href="company.html">Company</a>
            </div>
            <div className="btn float-right">
              <a className="nav-item" rel="nofollow" href="get-started/login.html">Login</a>
            </div>
            <div className="btn-sing float-right">
              <a className="btn btn-border" href="get-started/register.html">Register</a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Start*/}
        <ul className="mobile-menu navbar-nav">
          <li>
            <a className="page-scroll" href="get-started/pricing.html">
              Pricing
            </a>
          </li>
          <li>
            <a className="page-scroll" href="company.html">
              Our Company
            </a>
          </li>
          <li>
            <a className="page-scroll" href="get-started/login.html">
              Login
            </a>
          </li>
          <li>
            <a className="page-scroll" href="get-started/register.html">
              Register
            </a>
          </li>
          </ul>
         {/*Mobile Menu End */}

      </nav>
      {/*Navbar End*/}

      {/*Hero Area Start*/}
      <div id="hero-area" className="hero-area-bg">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
              <div className="col-md-6 col-sm-6">
                  <div className="contents text-left">
                    <h2 className="benefit-headingh wow fadeInDown" data-wow-delay="0.3s"> Online Donations Made Easy & Rewarding </h2>
                  <div className="wow fadeInUp" data-wow-delay="0.6s">
                    <ul>
                      <li id="hero-text"><i className="zmdi zmdi-check-all"></i> Embed Giveasily effortlessly into your website or mobile app or use our popup widget</li>
                      <li  id="hero-text"><i className="zmdi zmdi-check-all"></i> Make recurring donations from your credit, debit cards or transfer directly from your bank account securely</li>
                      <li  id="hero-text"><i className="zmdi zmdi-check-all"></i> Never lack what to give. Earn 0.5% on every donation your friends make through Giveasily</li>
                      <br />
                <div className="header-button wow fadeUp" data-wow-delay="0.3s">
                  <a href="#" className="btn btn-common mag">SIGN UP, It's free</a>
                  </div>
                    </ul>
                  </div>
                  </div>
                </div>
            <div className="col-md-6 col-sm-6">
              <div className="contents text-center">
                <div className="text-center"><img src="assets/img/giveasily_iphone.png" width="450" />
                  {/*<!-- 
//Commented out to avoid duplicate of the CTA button//
                  <p className="title-mored wow fadeInUp" data-wow-delay="0.3s">It's totally free!</p>
                <br>
                <div className="header-button wow fadeUp" data-wow-delay="0.3s">
                  <a href="#" className="btn btn-common mag">SIGN UP IN 2 MINUTES</a>
                  <br> -->*/}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </header>
        )
    }
}

export default Header;