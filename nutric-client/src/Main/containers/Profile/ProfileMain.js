import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Navlink} from 'react-router-dom';
import BillingPlansCards from '../../components/BillingPlan/BillingPlanCards'
import Grid from '@material-ui/core/Grid';

class ProfileMain extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  
  render(){
    const {headerTitle}=this.props
    return(
      <div>
      
      
    <Grid container >
      <Grid container sm={12} >
        <div>{this.props.currentUserId}</div>
      </Grid>  
      <Grid container sm={12} >  
        <Grid item sm={6}>
          <BillingPlansCards/>
        </Grid>
      </Grid>
    </Grid>
    
      </div>
    )
  }
};




function mapStateToProps(state){
  return{
   
    currentUserId: state.currentUser.user.id
  };
};

export default connect(mapStateToProps, )(ProfileMain);

