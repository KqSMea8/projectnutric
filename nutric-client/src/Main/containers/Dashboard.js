import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

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
import ProfileMain from "./Profile/ProfileMain";
import SuscriptionDetails from "../components/BillingPlan/BillingPlanSuscription";
import ExpertPasswordReset from "../components/Expert/ExpertPasswordReset";

import Header from './Header';

//Para que todas las Routes entren en el grid.
const styles = theme => {
  return ({
    toolbar: {
      flexGrow: 1, //pa q contenido de dashboard ocupe height y width disponible. No ocupa toodo el height
      margin: '25px',
      height: "100%"
    }
  })
}

class Dashboard extends Component {
  state = {
    headerTitle: "Nutric.io"
  }

  changeHeaderTitle = (newTitle) => {
    this.setState({
      headerTitle: newTitle
    })
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div style={{width:"100%"}}>
        <Header headerTitle={this.state.headerTitle} open={this.props.open} handleDrawerToggle={this.props.handleDrawerToggle} />
        <div className={classes.toolbar}>
          <Switch>
            <Route 
              exact 
              path="/" 
              render={() => {
                return (
                  <Redirect to='/inicio'/> 
                );
              }}
            />
            <Route 
              exact 
              path="/inicio" 
              render={() => {
                return (
                  <HomeMain headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle}/>
                );
              }}
            />
            <Route 
              exact 
              path="/pacientes" 
              render={() => {
                return(
                  <PatientsMain {...this.props} headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                );
              }}
            />
            <Route 
              exact 
              path="/agenda" 
              render={() => {
                return(
                  <ScheduleMain headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle}/>
                );
              }}
            />
  {/*RUTAS DE MEAL PLAN*/}
            <Route
              exact
              path="/dietas" 
              render={(props) => {
                return(
                  <MealPlanMain {...props} headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                );
              }}
            />
            <Route 
              exact
              path="/dietas/crear" 
              render={() => {
                return(
                  <MealPlanCreate headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle}/>
                );
              }}
            />
  {/*RUTAS DE MEAL PLAN*/}
            <Route 
              exact 
              path="/recetas" 
              render={() => {
                return(
                  <RecipesMain headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                );
              }}
            />
            <Route 
              exact 
              path="/estadisticas" 
              render={() => {
                return(
                  <StatsMain headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                  
                );
              }}
            />
  {/*RUTAS DE PROFILE,SETTINGS, ETC*/}
            <Route 
              exact 
              path="/perfil" 
              render={() => {
                return(
                  <ProfileMain headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle}/>
                  
                );
              }}
            />
            <Route 
              exact 
              path="/perfil/suscripcion" 
              render={() => {
                return(
                  <SuscriptionDetails headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                  
                );
              }}
            />
            <Route 
              exact 
              path="/reestablecer-contraseña" 
              render={() => {
                return(
                  <ExpertPasswordReset headerTitle={this.state.headerTitle} changeHeaderTitle={this.changeHeaderTitle} />
                  
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

export default withRouter(connect(mapStateToProps, { removeError })(withStyles(styles, { withTheme: true })(Dashboard)))
