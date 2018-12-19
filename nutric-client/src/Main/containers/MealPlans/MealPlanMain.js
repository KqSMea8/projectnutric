import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Card, CardMedia, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import { fetchMealPlanTemplates } from '../../store/actions/mealPlanTemplate';
import MealPlanCreate from './MealPlanCreate';
import MealPlanMainTable from '../../components/MealPlans/MealPlanMainTable';
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
    console.log(this.props.currentUser)
    this.props.fetchMealPlanTemplates(this.props.currentUser); //poner expert id
  }
  
  handleMouseEnter = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };
  
  render(){
    const {match, mealPlanTemplates} = this.props;
  return (
    <div style={{height: '100%'}}>
      <Link to={`${match.url}/crear`} >Click para ir a /dietas/crear</Link>
      <Grid container style={{height: '100%'}}>
      
        <Grid container style={{height: '20%', minHeight: 'fit-content', paddingBottom: '20px', borderBottom: '1px solid #d3d3d3'}}>
         {/*por ahora styiling ok hasta 3*/}
          {mealPlanTemplates.map((mpt, i) => {
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
              onMouseEnter={() => this.handleMouseEnter(i)} //indice del map para seleccionar el que quiero hoverear
              onMouseLeave={() => this.handleMouseLeave(i)}
              isHovering={this.state.isHovered[i]}
              key={_id}
            />
            );
          })}
        </Grid>
  
  {/*===============================*/}
  
          <Grid container spacing={40} style={{height: 'auto', margin: '0'}} > {/*spacing para los child*/}
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
  return {
    mealPlanTemplates: state.mealPlanTemplates,
    currentUser: state.currentUser.user.id
  }
  
}


export default connect(mapStateToProps, { fetchMealPlanTemplates })(MealPlanMain);