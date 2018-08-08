import React, {Component} from 'react';

const Middle = (props)=>(
    <section id="team" className="section-padding text-center">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="section-header text-center">
                    <h2 className="benefit-heading wow fadeInDown" data-wow-delay="0.3s"><br />The Lead Team</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-4">
                {/*Team Item Starts*/}
                <div className="team-item text-center">
                    <div className="team-img">
                        <img className="img-fluid" src="assets/img/team/team-01.jpg" alt="" />
                        <div className="team-overlay">
                            <div className="overlay-social-icon text-center">
                                <ul className="social-icons">
                                    <li><a href="#"><i className="lni-facebook-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-twitter-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-instagram-filled" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="info-text">
                        <h3><a href="#">Paul Oseghale</a></h3>
                        <p>Co-Founder/CFO</p>
                    </div>
                </div>
                {/*Team Item Ends*/}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-4">
                {/*Team Item Starts*/}
                <div className="team-item text-center">
                    <div className="team-img">
                        <img className="img-fluid" src="assets/img/team/team-02.jpg" alt="" />
                        <div className="team-overlay">
                            <div className="overlay-social-icon text-center">
                                <ul className="social-icons">
                                    <li><a href="#"><i className="lni-facebook-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-twitter-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-instagram-filled" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="info-text">
                        <h3><a href="#">Ayoyemi Ayeyemi</a></h3>
                        <p>Co-Founder, Growth</p>
                    </div>
                </div>
                {/*Team Item Ends*/}
            </div>

            <div className="col-sm-6 col-md-6 col-lg-4">
                {/*Team Item Starts*/}
                <div className="team-item text-center">
                    <div className="team-img">
                        <img className="img-fluid" src="assets/img/team/team-03.jpg" alt="" />
                        <div className="team-overlay">
                            <div className="overlay-social-icon text-center">
                                <ul className="social-icons">
                                    <li><a href="#"><i className="lni-facebook-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-twitter-filled" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="lni-instagram-filled" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="info-text">
                        <h3><a href="#">Imafidon Osama</a></h3>
                        <p>Co-Founder/CTO</p>
                    </div>
                </div>
                {/*Team Item Ends*/}
            </div>

        </div>
    </div>
</section>
)

export default Middle;