import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Card, CardMedia, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import { fetchMealPlanTemplates, removeMealPlanTemplate } from '../../store/actions/mealPlanTemplate';
import { fetchMealPlans } from '../../store/actions/mealPlan';
import MealPlanCreate from './MealPlanCreate';
import MealPlanPendingTable from '../../components/MealPlans/MealPlanPendingTable';
import MealPlanTemplateCard from '../../components/MealPlans/MealPlanTemplateCard';
import plantilla_default from '../../images/plantilla_default.jpg';




class MealPlanMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHovered:{}
    };
  }
  
  componentDidMount(){
    this.props.fetchMealPlanTemplates(this.props.currentUser);
    this.props.fetchMealPlans(this.props.currentUser); 
    this.props.changeHeaderTitle("Plan alimenticio");
  }
  

  render(){
    const {match, currentUser, mealPlanTemplates, removeMealPlanTemplate, mealPlans} = this.props;

    
    const mealPlansList = mealPlans.map(mealPlan => {
      if(mealPlan.patient==null){
        return null
      } else {
        const {patient, createdAt, objective, progress} = mealPlan;
        return (
          [`${patient.firstName} ${patient.lastName}`, createdAt, objective, progress]
        );
      }
    })
    
    
    
    return (
      <div style={{height: '100%'}}>
        <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
        <Grid container style={{height: '100%'}}>
        
          <Grid container style={{height: '20%', minHeight: 'fit-content', paddingBottom: '20px', borderBottom: '1px solid #d3d3d3'}}>
           {/*por ahora styiling ok hasta 3*/}
            {mealPlanTemplates.map((mpt) => {
            // agregar imagen al modelo
              const { mealPlanTemplateName, avgDailyCalories, avgDailyProtein, avgDailyCarbs, avgDailyFat, _id } = mpt; 
              return(
              <MealPlanTemplateCard 
                image={plantilla_default}
                imageTitle={'plantilla_default'}
                mealPlanTemplateName={mealPlanTemplateName}
                calories={avgDailyCalories}
                protein={avgDailyProtein}
                carbs={avgDailyCarbs}
                fat={avgDailyFat}
                popupRemove={removeMealPlanTemplate.bind(this, currentUser, _id)} //currentUser es el id del experto
                // show={showMealPlanTemplate.bind(this, currentUser, _id)}
                key={_id}
              />
              );
            })}
          </Grid>
    
    {/*===============================*/}
    
            <Grid container spacing={40} style={{height: 'auto', margin: '0'}} > {/*spacing para los child*/}
              <Grid item xs={8} >
                {/*<MealPlanPendingTable 
                  mealPlans={mealPlans} //transformar a dietas pendientes en este componente
                /> 
                */}
                <MealPlanPendingTable mealPlansList={mealPlansList} numRows={7} />
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
  return {
    mealPlans: state.mealPlans,
    mealPlanTemplates: state.mealPlanTemplates,
    currentUser: state.currentUser.user.id
  }
  
}


export default connect(mapStateToProps, { fetchMealPlanTemplates, removeMealPlanTemplate, fetchMealPlans })(MealPlanMain);