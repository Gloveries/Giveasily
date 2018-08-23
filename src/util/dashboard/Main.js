import React, {Component} from 'react';
import { TopCard, Filter, TopBoxes, EmailConfirmationOverlay } from './utils';
import ReactLoading from 'react-loading'
import { registeredCompanies } from '../../data';

class Main extends Component {
    constructor(props){
        super(props);

        this.state ={
            companyList:[],
            purposes:[],
            user:{
                email:"osamaimafidon@gmail.com"
            }
        }
        this.populatePurposeField = this.populatePurposeField.bind(this)
    }

componentDidMount() {
    const that = this;
    const companyList = registeredCompanies;
    setTimeout(function(){
        that.setState({
            companyList
        })
    },1000)
}


populatePurposeField = function (companyName) {
    if(companyName === 'choose organisation') {
        this.setState({
            purposes:[]
        })
        return;
    }
    const company = this.state.companyList.find(function(el){
        return el.name === companyName;
    })
    const purposes = company.purposes;
    console.log(purposes)
    this.setState({
        purposes
    })
}

render() {
    return (
<div>
<TopBoxes />
<br /><br />
        <div className="container" >
            <div className="row ml-2">

              <form className="col-6 pl-3 pr-3 pb-3 pt-0 mt-0 donate-form "> 
                    <div className="p-3">choose how you want to give
                        <select className="custom-select">   
                            <option>Donate</option>
                            <option>Pledge</option>                             
                    </select> 
                    </div>                   
                  <div className="p-3">Choose who you want to give
                    <select onChange={e=>this.populatePurposeField(e.target.value)} className="custom-select">
                        <option>choose organisation</option>
                        {this.state.companyList.map((val,i)=>{
                            return <option  key={i}>{val.name}</option>
                        })}
                    </select> 
                    </div>

                {/*<div class="col-2"><ReactLoading type="spokes" color="#888" height={'20%'} width={'20%'} /></div>*/}
                <div className="p-3">Choose what you want to give for
                    <select className="custom-select">
                        <option>select purpose</option>                        
                        {this.state.purposes.map((P,i)=>{
                            return <option key={i}>{P}</option>
                        }
                   )}
                    </select> 
                </div>
                {/*<div class="col-2"><ReactLoading type="spokes" color="#888" height={'20%'} width={'20%'} /></div>                */}
                <div className="p-3">
                    <button className="btn btn-success o-correct-btn-radius">Give now!</button>
                </div>
        </form>
        <div className="col-5">
            <h3 >GiveQuickly<sup>TM</sup></h3>
                {[0, 1, 2, 3].map((T, i) =>(
                    <div key={i} >
                        <TopCard />
                      </div>
                    ))}
        </div>


            </div><br /><br />

            
            <div style={{ width: "100%", height:"100px",marginTop:"100px" }}>Charts will go here</div>

            {/*<div style={{display:"flex",justifyContent:"space-between"}} >
                <div className="bottom-cards">
                    <div className="modify-icon-size"><i className="lni-hand"></i></div><br />
                    <div style={{alignItems:"center",fontSize:"1.5em"}}>Make a pledge</div>
                </div>
                <div className="bottom-cards bg-purple">
                    <div className="modify-icon-size"><i className="lni-gift"></i></div><br />
                    <div style={{alignItems:"center",fontSize:"1.5em"}}>Schedule a gift</div>
                </div>   
                <div className="bottom-cards bg-theme">
                    <div className="modify-icon-size"><i className="lni-mastercard"></i></div><br />
                    <div style={{alignItems:"center",fontSize:"1.5em"}}>Funding sources</div>
                </div>              
            </div>*/}
        </div>
</div>
    )
}
}

export default Main;