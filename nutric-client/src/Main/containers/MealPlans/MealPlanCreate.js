import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {fetchFoods} from '../../store/actions/foods'
import SearchBar from '../../components/MealPlans/SearchBar'
import TableResult from '../../components/MealPlans/TableResult'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton';

import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import 'moment/locale/es';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});


function getSteps() {
  return ['Lunes', 'Martes','Miércoles', 'Jueves','Viernes','Sábado','Domingo'];
}



class MealPlanCreate extends Component{
  constructor(props){
    super(props);
    this.state = { 
      mealPlan:{
        days:[{
          dayName:"Lunes",
          meals:[{
            mealName:"Desayuno",
            mealTime:moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[
              {type:"Manzana"},
              {type:"Huevo"},
              {type:"Palta"}
              ]
          },{
            mealName:"Pre-Entreno",
            mealTime: moment().set({ hour: 10, minute: 45, second: 0, millisecond: 0 }).toDate(),
            recipes:[
              {type:"Toma"},
              {type:"Tu"},
              {type:"Camote"}
              ]
          }
          ]
        },{
          dayName:"Martes",
          meals:[{
            mealName:"Desayuno",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[
              {type:"Eat"},
              {type:"More"},
              {type:"Shit"}
              ]
          },
          ]
        },{
          dayName:"Miércoles",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[]
          },
          ]
        },{
          dayName:"Jueves",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[]
          },
          ]
        },{
          dayName:"Viernes",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[]
          },
          ]
        },{
          dayName:"Sábado",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[]
          },
          ]
        },{
          dayName:"Domingo",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes:[]
          },
          ]
        }]
      },
      selectedFood:"",
      selectedInputRef:"",
      dayIndex:0,
      completed:{},
      dayIndex:0
    }
  };
  

  addNewMealButton = (daySelected => {
    const copy=this.state.mealPlan;
    const updated=copy.days[daySelected].meals.push(
          {
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          }
      )
    this.setState({
      mealPlan:copy
    })
  })
  
  addNewRecipeButton = (selected,identifier) => {
    const copy=this.state.mealPlan;
    //Lo unico que necesitamos es determinar dinámicamente lastDay y lastMeal, según la ubicación del searchBar
    const lastDay=copy.days.length
    const lastMeal=copy.days[identifier[0]].meals.length  
    const updated=copy.days[identifier[0]].meals[identifier[1]].recipes.push(
      {type: selected.name} //nombre de la comida
      )
    console.log(selected.name+"\r\n"+identifier[0]+identifier[1])
    this.setState({
      mealPlan:copy
    })
  }
  
  deleteRecipeButton = (identifier) => {
    const copy=this.state.mealPlan;
    //Lo unico que necesitamos es determinar dinámicamente lastDay y lastMeal, según la ubicación del searchBar
    const lastDay=copy.days.length;
    const lastMeal=copy.days[identifier[0]].meals.length;
    const updated=copy.days[identifier[0]].meals[identifier[1]].recipes.splice(identifier[2],1);
    this.setState({
      mealPlan:copy
    })
}
  
  //funciones para el stepper
  totalSteps = () => {
    return getSteps().length;
  };

  
  handleNext = () => {
    let dayIndex;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      dayIndex = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      dayIndex = this.state.dayIndex + 1;
    }
    this.setState({
      dayIndex,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      dayIndex: state.dayIndex - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      dayIndex: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.dayIndex] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      dayIndex: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.dayIndex === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }  


  
  render(){
    const { classes } = this.props;
    const steps = getSteps();
    const { dayIndex } = this.state;

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

    return (
      <div>
        <Link to='/dietas'>Click para ir a /dietas </Link>  
        <div className={classes.root}>
          <Stepper nonLinear activeStep={dayIndex} alternativeLabel>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepButton
                    onClick={this.handleStep(index)}
                    completed={this.state.completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  A ver has
                </Typography>
                <Button onClick={this.handleReset}>Resetear</Button>
              </div>
            ) : (
              <div>
                <div className={classes.instructions}>
                  <div key={dayIndex}>
                    <ul>
                      { 
                        this.state.mealPlan.days[dayIndex].meals.map((meal, mealIndex) =>
                          <div key={dayIndex+"-"+mealIndex}>
                          <hr/>
                            <li>
                              <Input defaultValue={meal.mealName=="" ? "Comida "+(mealIndex+1) : meal.mealName}/>
                              <TimePicker use12Hours defaultValue={moment(meal.mealTime)} format={"h:mm a"} minuteStep={5} allowEmpty={false}/>
                            </li>
                            <ol>
                            {meal.recipes.length==0 && (
                                <li key={dayIndex+"-"+mealIndex+"input"}>
                                  <SearchBar selectedInputIdentifier={[dayIndex,mealIndex]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
                                </li>
                              )}
                            {
                              meal.recipes.map((alimento, alimentoIndex) => 
                              <div key={dayIndex+"-"+mealIndex+"-"+alimentoIndex}>
                                <li>
                                  <Input value={alimento.type}/>
                                  <IconButton aria-label="Delete" onClick={e=>(this.deleteRecipeButton([dayIndex,mealIndex,alimentoIndex]))}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </li>
                                {(meal.recipes.length==alimentoIndex+1)  && 
                                  <li key={dayIndex+"-"+mealIndex+"input"}>
                                    <SearchBar selectedInputIdentifier={[dayIndex,mealIndex]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
                                  </li>
                                }
                              </div>
                              )
                            }
                            </ol>
                        
                          </div>
                          )
                      }
                    </ul>
                  </div>
                </div>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item md={12}>
                    <Grid container>
                      <Grid item md={2}>
                        <TimePicker/>
                      </Grid>
                      <Grid item md={3}>
                        Alimentos
                      </Grid>
                      <Grid item md={1}>
                        Nombre
                      </Grid>
                      <Grid item md={3}>
                        Graph x meal
                      </Grid>
                      <Grid item md={3}>
                        Graph x dia
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="flex-start">
                        <Grid item md={10}>
                          Tabla resultados
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                  <div className="animated swing">
                    <Button variant="contained" color="primary" onClick={e=>{this.addNewMealButton(dayIndex)}}>
                      Agregar comida (para el {this.state.mealPlan.days[dayIndex].dayName})
                    </Button>
                  </div>
                <div>
                  <Button
                    disabled={dayIndex === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Atrás
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Siguiente
                  </Button>
                  {dayIndex !== steps.length &&
                    (this.state.completed[this.state.dayIndex] ? (
                      <Typography variant="caption" className={classes.completed}>
                        {getSteps()[dayIndex]} está completado
                      </Typography>
                    ) : (
                      <Button variant="contained" color="primary" onClick={this.handleComplete}>
                        {this.completedSteps() === this.totalSteps() - 1 ? 'Finalizar' : 'Día terminado'}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }}
  
  
MealPlanCreate.propTypes = {
  classes: PropTypes.object,
};
  
  
function mapStateToProps(state){
  return{
    foods: state.foods,
    currentUserId: state.currentUser.user.id
  };
};

  
export default connect(mapStateToProps, {fetchFoods})(withStyles(styles)(MealPlanCreate));