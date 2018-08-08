import React, { Component } from 'react'
import IndexHeader from '../util/index/Header';
import Header from './Header';
import Footer from '../util/Footer';
import { ArrowUp, Preloader } from '../util/utils';
import Features from '../util/index/Features'
import Platforms from '../util/index/Platforms'
import RequestDemo from '../util/index/RequestDemo';
import Bottom from '../util/index/Bottom'





class Index extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
<div>
    {/*<div style={{"backgroundColor":"#000","opacity":"0.6","position":"absolute","width":"100%","zIndex":"10","height":"100%"}}></div>*/}
<IndexHeader />
    
<Features />
<Platforms />
<RequestDemo />

<Bottom />
<br />
<Footer /> 

    {/*Go to Top Link*/}
<ArrowUp />
    
    {/*Preloader*/}
<Preloader />
</div>
        )
    }
}

export default Index;