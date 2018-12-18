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
    width: '90%',
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SearchBar/>
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Complete el plan alimenticio';
  }
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
            mealTime:moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[
              {type:"Manzana"},
              {type:"Huevo"},
              {type:"Palta"}
              ]
          },{
            mealName:"Pre-Entreno",
            mealTime: moment().set({ hour: 10, minute: 45, second: 0, millisecond: 0 }),
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
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
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
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          },
          ]
        },{
          dayName:"Jueves",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          },
          ]
        },{
          dayName:"Viernes",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          },
          ]
        },{
          dayName:"Sábado",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          },
          ]
        },{
          dayName:"Domingo",
          meals:[{
            mealName:"",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          },
          ]
        }]
      },
      selectedFood:"",
      selectedInputRef:"",
      activeStep:0,
      completed:{}
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
  
  //funciones para el stepper
  
  totalSteps = () => {
    return getSteps().length;
  };

  
  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }  

  render(){
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    
    return (
      <div>
        <Link to='/dietas'>Click para ir a /dietas </Link>  
        {
            this.state.mealPlan.days.map((day,dayIndex) => 
                <div key={dayIndex}>
                    <h4>{day.dayName}</h4>
                    <ul>
                    { 
                        day.meals.map((meal, mealIndex) =>
                          <div key={dayIndex+"-"+mealIndex}>
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
                                  <Input defaultValue={alimento.type}/>
                                  <IconButton aria-label="Delete">
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
                      <Button variant="contained" color="primary" onClick={e=>{this.addNewMealButton(dayIndex)}}>
                        Agregar comida (para el {day.dayName})
                      </Button>
                    </ul>
                </div>
            )
        }
        
        <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
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
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
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
                {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      {getSteps()[activeStep]} está completado
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