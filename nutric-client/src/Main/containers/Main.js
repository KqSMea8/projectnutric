import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';


class Main extends Component{
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  handleDrawerToggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };
  
  render(){
    const {currentUser} = this.props;
    return(
      // sin este flex se va a la mierda. con flexDirection column y header en relative,
      // el unico problema es q div Dashboard se va a atras del sidebar
      <div style={{display: 'flex', height:"100%"}}>
        {!currentUser.isAuthenticated &&  <Redirect to="/login"/> }
          
            <Sidebar open={this.state.open} />
            <Dashboard open={this.state.open} handleDrawerToggle={this.handleDrawerToggle}/> 
        
  
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default connect(mapStateToProps, {authUser, removeError})(Main);