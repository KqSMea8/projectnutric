import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';

class HomeMain extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  componentDidMount(){
    this.props.changeHeaderTitle("Inicio")
  }
  
  render(){
    return(
      <div>
        <div>{this.state.headerTitle}</div>
      </div>
    )
  }
};

export default HomeMain;

