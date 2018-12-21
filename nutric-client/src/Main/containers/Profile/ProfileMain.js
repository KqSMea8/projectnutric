import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Navlink} from 'react-router-dom';

class ProfileMain extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  
  render(){
    const {headerTitle}=this.props
    return(
      <div>
        <div>{headerTitle}</div>
      </div>
    )
  }
};

export default ProfileMain;

