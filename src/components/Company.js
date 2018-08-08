import React, { Component } from 'react';
import Header from './Header';
import Footer  from '../util/Footer'
import  Top from '../util/company/Top';
import  Middle from '../util/company/Middle';
import  Bottom from '../util/company/Bottom'
import { ArrowUp, Preloader } from '../util/utils'



class Company extends Component {
    constructor(props) {
        super(props)

    }

    render() {
       return (
<div>
    <Header />
{/*Header Area wrapper End*/}

{/*Benefits Section */}
<Top />
{/*Team Section Start */}
<Middle />
{/*Team Section End*/}
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

export default Company