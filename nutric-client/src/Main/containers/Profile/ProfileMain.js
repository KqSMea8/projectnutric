import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Navlink } from 'react-router-dom';
import BillingPlansCards from '../../components/BillingPlan/BillingPlanCards'
import BillingPlansSuscription from '../../components/BillingPlan/BillingPlanSuscription'
import ExpertProfile from '../../components/Expert/ExpertProfile'
import GoogleApiWrapper from '../../components/Expert/LocationGoogleMaps'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const buttonStyling = {
  width: '100%',
  height: 55,
  marginBottom: 15,
  marginLeft: 10
}

class ProfileMain extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }



  componentDidMount() {
    this.props.changeHeaderTitle("Perfil")
  }


  render() {
    return (
      <div>
      
      
    <Grid container >
      <Grid item sm={6} >
        <ExpertProfile/>    
      </Grid>  
      <Grid item sm={6} >
      <div style={{marginTop:40}}>
        <Button style={buttonStyling} variant="contained" size="large" color="primary">Ver mi página personal</Button>
         <Link to={'/reestablecer-contraseña'}><Button style={buttonStyling} variant="contained" size="large" color="primary">Cambiar contraseña</Button></Link>  
        <Link to={'/perfil/suscripcion'}><Button style={buttonStyling} variant="contained" size="large" color="primary">Detalles de mi suscripción</Button></Link>   
        <Button style={buttonStyling} variant="contained" size="large" color="primary">Recomendar a un amigo</Button>
     </div>
      </Grid>  
      <Grid container sm={12} >  
        <Grid item sm={6} xs={12}>
          <BillingPlansCards/>
        </Grid>
        <Grid item sm={6} xs={12}>
         <GoogleApiWrapper/>
        </Grid>
      </Grid>
    </Grid>
    
      </div>
    )
  }
};




function mapStateToProps(state) {
  return {

    currentUserId: state.currentUser.user.id
  };
};

export default connect(mapStateToProps, )(ProfileMain);
