import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table} from '@material-ui/core'
import MealPlanMainTable from '../../components/MealPlans/MealPlanMainTable.js'

const MealPlanMain = ({ match }) => {
  
  return(
    <Grid container >
      <Grid container>
        <Grid item md={4}> Coso2</Grid>
        <Grid item md={4}> Coso2</Grid>
        <Grid item md={4}> Coso3</Grid>
      </Grid>
      <hr/>
      <Grid container>
        <Grid item md={8}>
          <MealPlanMainTable/>
        </Grid>
        <Grid item md={4}>
          <Grid container>
            <Grid item md={12}> Grafico1 </Grid>
            <Grid item md={12}> Grafico 2 </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Grid>

  );
  
}

export default MealPlanMain;