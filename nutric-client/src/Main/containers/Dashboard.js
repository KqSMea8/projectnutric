import React, {Component} from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

// ACTIONS
import { removeError } from '../store/actions/errors'

// COMPONENTS
// import Homepage from '../components/Homepage';
import HomeMain from './Home/HomeMain';
import PatientsMain from "./Patients/PatientsMain";
import ScheduleMain from "./Schedule/ScheduleMain";
import MealPlanMain from "./MealPlans/MealPlanMain";
import RecipesMain from "./Recipes/RecipesMain";
import MealPlanCreate from "./MealPlans/MealPlanCreate";
import NoMatch from '../components/NoMatch';
import StatsMain from './Estadísticas/EstadísticasMain';
import ProfileMain from './Profile/ProfileMain';

import Header from './Header';

//Para que todas las Routes entren en el grid.
const styles = theme => {
  return (
    {
      toolbar: {
        flexGrow: 1, //pa q contenido de dashboard ocupe height y width disponible. No ocupa toodo el height
        margin: '25px',
        height:"100%"
      }
  })
}  

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state={
      navTitle:"chuerk"
    }
  }

  changeHeaderTitle=(title)=>{
    this.setState({navTitle: title})
  }
  
  
  render(){
    const { classes, theme } = this.props;
    
    return(
      <div style={{width:"100%"}}>
        <Header open={this.props.open} handleDrawerToggle={this.props.handleDrawerToggle} />
        <div className={classes.toolbar}>
          <Switch>
            <Route 
              exact 
              path="/" 
              render={props=> {
                return (
                  <Redirect to='/inicio'/> 
                );
              }}
            />
            <Route 
              exact 
              path="/inicio" 
              render={props => {
                return (
                  <HomeMain headerTitle={"Inicio"}/>
                );
              }}
            />
            <Route 
              exact 
              path="/pacientes" 
              render={props => {
                return(
                  <PatientsMain headerTitle={"Pacientes"} {...props} />
                );
              }}
            />
            <Route 
              exact 
              path="/agenda" 
              render={props => {
                return(
                  <ScheduleMain headerTitle={"Agenda"}/>
                );
              }}
            />
  {/*RUTAS DE MEAL PLAN*/}
            <Route
              exact
              path="/dietas" 
              render={props => {
                return(
                  <MealPlanMain {...props} />
                );
              }}
            />
            <Route 
              exact
              path="/dietas/crear" 
              render={props => {
                return(
                  <MealPlanCreate {...props} />
                );
              }}
            />
  {/*RUTAS DE MEAL PLAN*/}
            <Route 
              exact 
              path="/recetas" 
              render={props => {
                return(
                  <RecipesMain {...props} />
                );
              }}
            />
            <Route 
              exact 
              path="/estadisticas" 
              render={props => {
                return(
                  <StatsMain/>
                  
                );
              }}
            />
{/*RUTAS PERFIL,CONFIGURACIÓN, ETC*/}
            <Route 
              exact 
              path="/perfil" 
              render={props => {
                return(
                  <ProfileMain headerTitle={"Perfil"}/>
                  
                );
              }}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div> 
      )
  }
} 


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps,{ removeError })(withStyles(styles, {withTheme: true})(Dashboard)))