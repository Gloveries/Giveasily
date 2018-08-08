import React, { component } from 'react';

const Platforms = (props)=>(
          <section className="platform">
        <div className="container-fluid platform">
            <h2 className="platform-heading wow fadeInDown text-center" data-wow-delay="0.3s" > <br/> Platforms <br/></h2>
            <div className="wrapper">
                <div className="Grid Grid--gutters Grid--cols-6 u-textCenter">
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Onlinegiving.png" width="150" /></div><span id="demotext">Online Giving</span></div>
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Mobilegiving.png" width="150" /></div><span id="demotext">Mobile Giving</span></div>
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Texttogive.png" width="150" /></div><span id="demotext">Text to Give</span></div>
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Socialgiving.png" width="150" /></div><span id="demotext">Social Giving</span></div>
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Scantogive.png" width="150" /></div><span id="demotext">Scan to Give</span></div>
                  <div className="Grid-cell"><div className= "Demo"><img src="assets/img/PlatformIcons/Kiosk.png" width="150" /></div><span id="demotext">Giving Kiosk</span></div>
                </div> 
            </div>
            <br /><br /><br /><br />
        </div>
        </section>
)

export default Platforms;