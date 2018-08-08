import React, {Component} from 'react';

const Bottom = (props)=>(
    <section className="section-padding" id="built">
    <div className="container">
        <div className="section-header text-center">
            <h2 className="benefit-heading wow fadeInDown" data-wow-delay="0.3s"> <br /> About Giveasily</h2>
            <br />
            <p className="benefit-paragraph">Giveasily is a web and mobile app solution 
                developed for Associations, NGO’s NPO’s, Religious organization and
                Philanthropies by a small team of passionate friends working together from
                all over the world to simplify the way our audience make and receive donations in Africa. 
                <br /><br />
            </p>
            <div className="row">
                <div className="col-md-6 col-sm-6">
                    <div className="contents text-center  ">
                        <h2 className="benefit-heading wow fadeInDown">Our Vision</h2>
                        <p className="benefit-paragraph">
                            To become the most preferred and reliable digital giving and engagement management solution provider in Africa.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="contents text-center  ">
                        <h2 className="benefit-heading wow fadeInDown">Our Mission</h2>
                        <p className="benefit-paragraph">
                            To constantly find simpler, quicker and more innovative ways of helping our 
                            clients to collect more donations and improve
                            the ways they engage with their donors.</p>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </div>
    </div>
</section>
)

export default Bottom;