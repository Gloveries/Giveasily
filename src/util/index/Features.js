import React, { Component } from 'react'

const Features = (props)=>(
      <section id="services" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="benefit-heading wow fadeInDown" data-wow-delay="0.3s"> <br /> Features That Makes Us Unique </h2> <p className="benefit-paragraph">Giveasily is the new online donation standard for collecting and making donations in Africa. Our users can now focus on achieving their mission and changing lives 
            in a massive proportion while we provide the technologies they need to increase engagement with their donors 
            and members worldwide. Start today by registering your Association, NGO, NPO or Religious Organization for free.</p> 
      
          <div className="row">
          </div>
        </div>
      </div> 

      {/*Benefits Icons start*/}
        <div className="container benefits">
            <div className="home-section__feature-items grid">
                <div className="grid__column grid__column--3">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                          <div className="svg svg--zero-setup"></div>
                        </div>
                        <h3 className="feature-item__title">Zero Setup Fee</h3>
                        <p className="feature-item__description">No fee necessary to create an account on Giveasily. Register now, It’s absolutely Free!</p>
                    </div>
                </div>
                <div className="grid__column grid__column--3">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--date"></div>
                        </div>
                        <h3 className="feature-item__title">Pledge Tracking</h3>
                        <p className="feature-item__description">Accept financial pledges & get smart tools for tracking all the pledges made by donors.</p>
                    </div>
                </div>
    
                <div className="grid__column grid__column--3 ">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--plugins"></div>
                        </div>
                        <h3 className="feature-item__title">Simple Integration</h3>
                        <p className="feature-item__description">Easily Integrate Giveasily into your website, mobile app, social media pages or CMS easily</p>
                    </div>
                </div>
                <div className="grid__column grid__column--3 ">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--next-day-payouts"></div>
                        </div>
                        <h3 className="feature-item__title">Next Day Payout</h3>
                        <p className="feature-item__description">Receive the value of financial donations & fees into your bank account the next day.</p>
                    </div>
                </div>
    
                <div className="grid__column grid__column--3 global-u-clear">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                          <div className="svg svg--instalments"></div>
                        </div>
                        <h3 className="feature-item__title">Recurring Giving</h3>
                        <p className="feature-item__description">Allow donors to schedule weekly and monthly recurring financial gifts automatically.</p>
                    </div>
                </div>
                <div className="grid__column grid__column--3">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--convenient"></div>
                        </div>
                        <h3 className="feature-item__title">Raise Funds Easily</h3>
                        <p className="feature-item__description">Accept donations from  your supporters to support any worthy cause or project easily.</p>
                    </div>
                </div>
    
                <div className="grid__column grid__column--3">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--security"></div>
                        </div>
                        <h3 className="feature-item__title">Bank-Level Security</h3>
                        <p className="feature-item__description">Giveasily is a PCI DSS Level 1 Secure with 256 bit SSL. We don't joke with security.</p>
                    </div>
                </div>
                <div className="grid__column grid__column--3">
                    <div className="feature-item">
                        <div className="feature-item__icon">
                            <div className="svg svg--reporting"></div>
                        </div>
                        <h3 className="feature-item__title">Real-time Reporting</h3>
                        <p className="feature-item__description">Gain reliable insight from reports & behavioral analytics from your back office in real-time.</p>
                    </div>
                </div>
                <div className="grid__column grid__column--3">
                  <div className="feature-item">
                      <div className="feature-item__icon">
                          <div className="svg svg--people"></div>
                      </div>
                      <h3 className="feature-item__title">Membership Mgt. Tool</h3>
                      <p className="feature-item__description">Keep track of your members, donors, membership fee and renewal dates all in one place.</p>
                  </div>
              </div>
              <div className="grid__column grid__column--3">
                <div className="feature-item">
                    <div className="feature-item__icon">
                        <div className="svg svg--subscribe"></div>
                    </div>
                    <h3 className="feature-item__title">Volunteer Mgt. Tool</h3>
                    <p className="feature-item__description">Seamlessly tract volunteers to your specific project and get real-time volunteer report & data analytics.</p>
                </div>
            </div>
            <div className="grid__column grid__column--3">
              <div className="feature-item">
                  <div className="feature-item__icon">
                      <div className="svg svg--multicurrency"></div>
                  </div>
                  <h3 className="feature-item__title">Accept Tithe & Offering</h3>
                  <p className="feature-item__description">Collect tithe, offering or pledges from willing church members anywhere & anytime.</p>
              </div>
          </div>
          <div className="grid__column grid__column--3">
            <div className="feature-item">
                <div className="feature-item__icon">
                    <div className="svg svg--hassle-free"></div>
                </div>
                <h3 className="feature-item__title">Instant Email Receipts</h3>
                <p className="feature-item__description">Donors will instantly receive email receipt with the detail of every donation they made.</p>
            </div>
        </div>
            </div>
        </div>
        <div className="container-fluid text-center">
           <a href="get-started/register.html" className="btn btn-common mag">Register, it's free</a> 
        </div>
        <br /> <br />
      </section>
 
)

export default Features;