import React, {Component} from 'react';

import {fetchBillingPlans} from '../../store/actions/billingPlans';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class BillingPlansCards extends Component{
  constructor(props){
    super(props)
      this.state = {}
  }
  
    componentWillMount(){
    const { currentUserId } = this.props;
    this.props.fetchBillingPlans(currentUserId, console.log('BPS fetched'));}
  
  render(){
  const { classes } = this.props;
  const {billingPlans} = this.props
  
   
  
  console.log(billingPlans)
  return (
    <div>
    <h2> Mis paquetes</h2> 
    {billingPlans.map(bp => {
    return(
    <div>
      
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            
           {bp.planName}
           
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            S/. 150
          </Typography>
          <Typography component="p">
            {bp.planDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button  variant="contained" color="primary">Editar</Button>
            <Button  variant="contained" color="secondary">Eliminar</Button>
        </CardActions>
      </Card>
    </div>  
    )
    })
    }
    </div> 
    )
}
}

function mapStateToProps(state){
  return{
    billingPlans: state.billingPlans,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchBillingPlans}) (withStyles(styles)(BillingPlansCards))
  


