import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {fetchFoods} from '../../store/actions/foods'
import SearchBar from '../../components/MealPlans/SearchBar'
import TableResult from '../../components/MealPlans/TableResult'
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input'
import Check from '@material-ui/icons/Check'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import 'moment/locale/es';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';


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
  tPicker: {
    width: "100%"
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
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

    return (
      <div>
        <Link to='/dietas'>Click para ir a /dietas </Link>  
        <div className={classes.root}>
        <Grid container>
          <Grid item md={5} xs={12}>
            <Stepper nonLinear activeStep={dayIndex} alternativeLabel>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}
                      completed={this.state.completed[index]}
                    >
                      {label.substr(0,3)}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid item md={5} xs={12}>
          </Grid>
        </Grid>
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography className={classes.instructions}>
                      RESUMEN DE HUEVADAS
                    </Typography>
                  </Grid>
                </Grid>
                <Button variant="outlined" color="secondary" onClick={this.handleReset}>Resetear</Button>
              </div>
            ) : (
              <div>
                <div className={classes.instructions}>
                  <div key={dayIndex}>
                      { 
                        this.state.mealPlan.days[dayIndex].meals.map((meal, mealIndex) =>
                          <div key={dayIndex+"-"+mealIndex}>
                            <hr/>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item md={12}>
                                <Grid container>
                                  <Grid item md={1} style={{textAlign:"center"}}>
                                    <Grid container direction="row" justify="space-between" alignItems="center" style={{height:"100%"}}>
                                      <Grid item xs={12}>
                                        <TimePicker className={classes.tPicker} suffixIcon use12Hours defaultValue={moment(meal.mealTime)} format={"h:mma"} minuteStep={5} allowEmpty={false}/>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <IconButton aria-label="Delete" className={classes.margin}>
                                          <DeleteIcon fontSize="large" style={{ color: "red" }} />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item md={3}>
                                    <ol>
                                    {/*meal.recipes.length==0 && (
                                        <li key={dayIndex+"-"+mealIndex+"input"}>
                                          <SearchBar selectedInputIdentifier={[dayIndex,mealIndex]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
                                        </li>
                                      )*/}
                                    {
                                      meal.recipes.map((alimento, alimentoIndex) => 
                                      <div key={dayIndex+"-"+mealIndex+"-"+alimentoIndex}>
                                        <li>
                                          <Input value={alimento.type} style={{width:"75%"}}/>
                                          <IconButton aria-label="Delete" onClick={e=>(this.deleteRecipeButton([dayIndex,mealIndex,alimentoIndex]))}>
                                            <Clear fontSize="small" style={{ color: "red" }}/>
                                          </IconButton>
                                        </li>
                                        {/*(meal.recipes.length==alimentoIndex+1)  && 
                                          <li key={dayIndex+"-"+mealIndex+"input"}>
                                            <SearchBar selectedInputIdentifier={[dayIndex,mealIndex]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
                                          </li>
                                        */}
                                      </div>
                                      )
                                    }
                                    </ol>
                                  </Grid>
                                  <Grid item md={2}>
                                      <TextField inputProps={{style:{textAlign:"center"}}} style={{margin:"0px 20px"}} id="outlined-bare" variant="outlined" defaultValue={meal.mealName=="" ? "Comida "+(mealIndex+1) : meal.mealName}/>
                                  </Grid>
                                  <Grid item md={3}>
                                    Graph x meal
                                  </Grid>
                                  <Grid item md={3}>
                                    Graph x dia
                                  </Grid>
                                  <Grid container direction="row" justify="center" alignItems="flex-start">
                                    <Grid item md={9}>
                                     <SearchBar selectedInputIdentifier={[dayIndex,mealIndex]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                          )
                      }
                  </div>
                </div>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item md={3} style={{ textAlign:"center" }}>
                    <MuiThemeProvider theme={theme}>
                      <Button variant="contained" color="primary" className={classes.margin} onClick={e=>{this.addNewMealButton(dayIndex)}}>
                        <AddIcon/> <Typography>Agregar comida</Typography>
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop:"10px", height:"100%"}}>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={dayIndex === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Anterior día
                    </Button>
                  </Grid>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    {dayIndex !== steps.length &&
                      (this.state.completed[this.state.dayIndex] ? (
                        <Typography variant="caption" className={classes.completed}>
                          {getSteps()[dayIndex]} está completado
                        </Typography>
                      ) : (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          <Check/>{this.completedSteps() === this.totalSteps() - 1 ? 'Finalizar' : 'Día terminado'}
                        </Button>
                      ))}
                  </Grid>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Siguiente día
                    </Button>
                  </Grid>
                </Grid>
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