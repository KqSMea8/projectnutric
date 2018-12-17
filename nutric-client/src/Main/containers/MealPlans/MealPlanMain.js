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
      <Grid container style={{height: '100%'}}>
        <Grid container style={{height: '20%'}}>
          <Grid item xs={4}> Coso1</Grid>
          <Grid item xs={4}> Coso2</Grid>
          <Grid item xs={4}> Coso3</Grid>
        </Grid>
      
        <Grid container style={{height: '60%'}} >
          <Grid item xs={8} >
            <MealPlanMainTable />
          </Grid>
          
          <Grid item xs={4}>
            <Grid container style={{height: '100%'}}>
              <Grid item xs={12}> Grafico1 </Grid>
              <Grid item xs={12}> Grafico 2 </Grid>
            </Grid>
          </Grid>
      
      </Grid>
      
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