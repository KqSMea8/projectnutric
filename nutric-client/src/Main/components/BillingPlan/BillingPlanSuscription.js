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
import MobileStepper from '@material-ui/core/MobileStepper';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: 20,
    marginLeft: 30,
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
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
};


class BillingPlansCards extends Component{
  constructor(props){
    super(props)
      this.state = {
        activeStep: 3,
      }
  }

  
  render(){
  const { classes, theme } = this.props;
  return (
    
    
   <div>
    <div>
      <h2 style={{marginLeft: 30}}> Mis suscripción</h2> 
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">Plan Premium </Typography>
          <Typography component="h6">
          <div>
            Periodo de suscripción: Mensual<br/> 
            Limite de pacientes activos al mes: 25<br/> 
            Precio mensual: S/. 99 <br/> 
            App movil activada: Si
          </div>  
          </Typography>
          <Typography variant="h5" component="h2">Datos de Facturación </Typography>
          <Typography component="h6">
          <div>
            Nombre completo<br/> 
            Dirección<br/> 
            Ciudad<br/> 
            Código postal
          </div>  
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button  variant="contained" color="primary">Editar</Button>
            <Button  variant="contained" color="secondary">Eliminar</Button>
        </CardActions>
      </Card>
    </div>  
      <div>
      <h2 style={{marginLeft: 30}}> Mis promociones</h2> 
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">Acualmente no tienes ninguna promoción activa </Typography>
          <Typography component="h6">
   
          </Typography>
          <Typography variant="h6" component="h2">Tienes usuarios 3 referidos actualmente </Typography>
          <Typography component="h6">
          <div>
          Llega a 5 y vas a tener un descuento del 30% durante todo el año
           <MobileStepper
              variant="progress"
              steps={6}
              position="static"
              activeStep={this.state.activeStep}
              className={classes.root}
  // TESTEA HDP
            />
            3/5
          </div>  
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button  variant="contained" color="primary">Editar</Button>
            <Button  variant="contained" color="secondary">Eliminar</Button>
        </CardActions>
      </Card>
    </div>  
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
  


