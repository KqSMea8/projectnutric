// info de miniDashboard plan almenticio

import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import MealPlanCreate from './MealPlanCreate';
const MealPlanMain = ({ match }) => {
  
    return(
      <div>
        <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
        <Route 
          exact 
          path={`${match.path}/crear`} 
          render={() => (<MealPlanCreate />) }
        />
      </div>
        
    );
  
}


export default MealPlanMain;