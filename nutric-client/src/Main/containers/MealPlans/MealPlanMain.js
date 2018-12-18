import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Card, CardMedia, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import MealPlanCreate from './MealPlanCreate';
import MealPlanMainTable from '../../components/MealPlans/MealPlanMainTable';
import MealPlanTemplateCard from '../../components/MealPlans/MealPlanTemplateCard';
import plantilla_default from '../../images/plantilla_default.jpg';



class MealPlanMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  componentDidMount(){
    // fetch meal plan templates
  };
  
  render(){
    const {match} = this.props;
  
  return (
    <div style={{height: '100%'}}>
      <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
      <Grid container style={{height: '100%'}}>
      
        <Grid container style={{height: '20%', paddingBottom: '20px', borderBottom: '1px solid #d3d3d3'}}>
         {/*por ahora styiling ok hasta 3*/}
         
            <MealPlanTemplateCard 
              image={plantilla_default}
              mealPlanTemplateName={'Tonificación Intensa'}
            />
            
            <MealPlanTemplateCard 
              image={plantilla_default}
              mealPlanTemplateName={'Tonificación Intensa'}
            />
            
            <MealPlanTemplateCard 
              image={plantilla_default}
              mealPlanTemplateName={'Tonificación Intensa'}
            />
            

        </Grid>
  
  {/*===============================*/}
  
          <Grid container spacing={40} style={{height: 'auto'}} > {/*spacing para los child*/}
            <Grid item xs={8} >
              <MealPlanMainTable /> {/*bug: con tabla,cuando scrolleo de costado navbar no es fixed*/}
            </Grid>
            
            <Grid item xs={4} >
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
  
}

function mapStateToProps(state){
  
}


export default connect(mapStateToProps, null)(MealPlanMain);