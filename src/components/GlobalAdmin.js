import React, { Component } from 'react';
import { TopCard, QueryTransacions } from '../util/dashboard/utils';
import moment from 'moment';
import ReactLoading from 'react-loading';
import { ArrowUp, Preloader } from '../util/utils';
import axios from 'axios'
import {ajaxController} from '../data/ajaxController'

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';

import { BarChart } from 'react-easy-chart'
const crud = ajaxController("http://jsonplaceholder.typicode.com/todos");



class GlobalAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: 23,
            startDate: moment(),
            anchorEl: null,
            buttonText: "DONATE",
            windowWidth:window.innerWidth,
            data: [],
            xDomainRange:[]

            

        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDonateClose = this.handleDonateClose.bind(this);
        this.handlePledgeClose = this.handlePledgeClose.bind(this);
        this.handleExportClick = this.handleExportClick.bind(this);
    }


componentDidMount() {
    const that = this;const todoId = 5;

    // crud.get().then(function(response){
    //     console.log(response.data)
    // })
//     axios.get('http://jsonplaceholder.typicode.com/todos' ,{
//     params: {
//       id: todoId
//     }
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

    const data = [
                { x: '10-Jan-15', y: 20 },
                { x: '12-Jan-15', y: 10 },
                { x: '15-Jan-15', y: 33 }
            ]
    const xDomainRange = ['1-Jan-15', '20-Jan-15'];

    setTimeout(function(){
        that.setState({data,xDomainRange})
    })


    window.addEventListener('resize',function() {
    const windowWidth = Math.round(this.innerWidth);
        // const height = this.innerHeight;
    console.log(typeof windowWidth);
    that.setState({
        windowWidth
        })  

    }) 
}

componentWillUnmount(){
    window.removeEventListener('resize')
}

    handleChange(event) {
        alert([event.target.name] + " " + event.target.value)
    }

    handleExportClick() {

    }

    handleDateChange(date) {
        // console.log((date._d).getDate());
        console.log(typeof date._d)
        // console.log((new Date(date)).getDate());
        //         console.log((new Date(date)).getMonth());        
                // console.log((new Date(date)).getFullYear());


        this.setState({
            startDate: date
        });
    }
    handleClick(event) {
        //   console.log(event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleDonateClose(e) {
        const buttonText = "DONATE"
        this.setState({ anchorEl: null, buttonText });
    };
    handlePledgeClose(e) {
        console.log(e.target)
        const buttonText = "PLEDGE"
        this.setState({ anchorEl: null, buttonText });
    };

render() {
    const loaderClass = (this.state.data.length===0 && this.state.xDomainRange.length==0)
    ?"position-loader":"dont-display"
    return (
     <div className="container">
        <div className="row">
            {[0, 1, 2, 3].map((T, i) => (
                <div className="col" key={i} >
                    <TopCard />
                </div>
            ))}
        </div><br /><br /><br />

        <QueryTransacions 
        handlePledgeClose={this.handlePledgeClose} 
        buttonText={this.state.buttonText} 
        anchorEl={this.state.anchorEl}
        handleDonateClose= {this.handleDonateClose}
        handleClick = {this.handleClick}
        startDate = {this.state.startDate}
        handleClose={this.handleClose}
        handleDateChange={this.handleDateChange}
        handleExportClick= {this.handleExportClick} 
        />
        <br /><br />
                
        <div className="bg-off-white" >
        <div className={loaderClass}><ReactLoading type="bars" color="#290c49" height={'10%'} width={'10%'} /></div> 
        <div className="pl-5 pt-3 "><span className="medium-font-size"><b>&#8358;0.00</b></span>&nbsp;&nbsp;
        <span className="medium-font-size">Total Donations </span></div>
        <br /><br />
        <BarChart
        axisLabels={{ x: 'Time', y: 'Total Amount' }}
        axes
        grid
        colorBars
        height={350}
        width={(this.state.windowWidth)>900?Math.round(0.8 * this.state.windowWidth):(this.state.windowWidth)}
        barWidth={20}
        xTickNumber={5}
        yTickNumber={3}
        xType={'time'}
        xDomainRange={this.state.xDomainRange}
        data={this.state.data}
        />
        </div><br /><br />
        {/*<ArrowUp />*/}
            </div>)
    }
}

export default GlobalAdmin;