/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import BookIcon from '@material-ui/icons/Book';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder'
import ReactLoading from 'react-loading'
import { Card, CardBody } from 'mdbreact';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

import {getUrl} from '../data/urlController';
import axios from 'axios';
import USER from '../data/userData';


const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};


class SimpleDialog extends React.Component {

    state = {
        inputElements:['input-0']
    }

createPage = (e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const amount = e.target.amount.value;
    const url = getUrl('pages')

    const body = (amount === "")?{name}:{name,amount}
    console.log(body)
    const options = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        },
        data:body
    }

    axios(options)
        .then((response)=>{
            console.log(response.data)
        })
        .catch(function(err){
            console.log(err)
        })
}
handleClose = () => {
this.props.onClose(this.props.selectedValue);
};
  addField = ()=>{
      const length = this.state.inputElements.length;
      const name = 'input-'+length;

      this.setState({
          inputElements:[...this.state.inputElements,name]
      },()=>{console.log(this.state.inputElements)})
  }
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose}  aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle style={{textAlign:"center"}} id="simple-dialog-title">Create Page</DialogTitle>
            <div className="p-3">
                <div className="mb-2 ">
                    <form onSubmit={this.createPage}>
                        <div>
                            <input required name="name" type="text" className="form-control input-themed-border"  placeholder="Name" /></div>
                        <div><br />
                            <input name="amount" type="text" className="form-control input-themed-border" placeholder="Amount" />
                            <small>
                                *Leave the <strong>amount</strong> field empty if you want to be able to collect any amount
                            </small>
                        </div><br />
                        <button className="btn bg-theme p-2" type="submit">
                            <BookIcon />&nbsp;CREATE PAGE</button>
                    </form>
                </div>
                {/*code for adding custom fields
                <p style={{textAlign:"center"}}>Create your own  fields</p>
                {
                    this.state.inputElements.map((F,i)=>{
                        return (
                                <div key={i} className="input-group mb-2 ">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Name of field</div>
                                    </div>
                                    <input name={F} style={{borderRight:"none"}} type="text" className="form-control p-4" id="inlineFormInputGroup" placeholder="e.g http://paystack.com/xcvthr" />
                                    <div className="input-group-append">
                                        <div style={{background:"red",color:"white"}} className="input-group-text px-3">X</div>
                                    </div>
                                </div>
                                )
                    })
                }
                <br />
                <span className="medium-font-size" onClick={this.addField} style={{float:"right",color:"blue"}}>+ add field</span>*/}
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1],
    pageLinks:['a'],
    pages:[],
    pageMessage:undefined,
    showLoader:false
  };

componentDidMount() {
    this.setState({
        showLoader:true
    })
    const url = getUrl('pages')
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token':  USER.getLocalStorageUserData().token,
        }
    }
    
    axios(options)
        .then((response)=>{
            console.log(response);
            const pages = response.data;
            if(pages.length === 0) {
                this.setState({
                    pages,
                    showLoader:false,
                    pageMessage:"No page data for this query"

            })
            return;
        }
        
            this.setState({
                pages,
                showLoader:false

            })
        })
        .catch((err)=>{
                this.setState({
                    showLoader:false,
                    pageMessage:"There appears to be a problem with your connection or your session expired. Pls Login again"

            })
        })
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  viewPage = pageData =>{
      const id = pageData._id
      const slug = pageData.slug
      this.props.history.push(`/pages/${id}/${slug}`,{
          pageData
      })
  }

  render() {
    return (
      <div className="container">
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
            <div className="align-center">
                <NewFolderIcon style={{width:"80px",height:"80px",color:"#290c49"}}  />
                {/*<img className="m-3" src="assets/img/PlatformIcons/Mobilegiving.png" width="80px" height="60px" /><br />*/}
                <h5 className="color-grey ">Create donations pages to begin recieving donations.<br /> Share this link to begin collecting payments</h5>
                <button onClick={this.handleClickOpen} className="btn btn-success p-2"><AddIcon />  &nbsp; New Page</button>
            </div><br /><br />
            <div className="o-overflow-x-auto">
            <Card className="pages-card-format">
                <CardBody className="p-0">
                    <table className="table table-hover m-0">
                        <thead>
                            <tr className="bg-theme color-white">
                                <td>Status</td>
                                <td>Name</td>
                                <td>Type</td>
                                <td>Amount</td>
                                <td>Added On</td>
                                <td>Link</td>
                            </tr>
                        </thead>
                        <tbody className="animated fadeIn">

                            {this.state.pages.map((U,i)=>{
                                return (
                                        <tr onClick={()=>{this.viewPage(U)}}  key={i}>
                                            <td>{U.active === true? "active":"inactive"}</td>
                                            <td>{U.name}</td>
                                            <td>{U.type}</td>
                                            <td>{U.amount === ""? "open":U.amount}</td>
                                            <td>{moment(U.paystack_created_at).format('MMM Do YYYY, h:mm:ss a')}</td> 
                                            <td>{U.url}</td>
                                        </tr>
                )
            })}
        </tbody>

    </table>
                    <div className={this.state.showLoader?"o-loader-class":"o-visibility-hidden"}>
                        <ReactLoading  type="bars" color="#999"  />
                        {this.state.pageMessage}
                    </div>
                    <span className={this.state.pageMessage?"o-loader-class color-red":"o-visibility-hidden"}>{this.state.pageMessage}</span>
    </CardBody>
</Card><br /></div>
</div>
    );
  }
}

export default SimpleDialogDemo;
