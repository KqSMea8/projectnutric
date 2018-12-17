// info de miniDashboard plan almenticio

import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import MealPlanCreate from './MealPlanCreate';
import MealPlanMainTable from '../../components/MealPlans/MealPlanMainTable'
const MealPlanMain = ({ match }) => {
  
  return(
    <div style={{height: '100%'}}>
      <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
      
    <Grid container direction={'column'} >
      <Grid item sm={4}>si</Grid>
      <Grid item sm={8}>no</Grid>
    </Grid>
      
      <Route 
        exact 
        path={`${match.path}/crear`} 
        render={() => (<MealPlanCreate />) }
      />
    </div>
      
  );
  
}


export default MealPlanMain;