import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { fetchFoods } from '../../store/actions/foods'
import SearchBar from '../../components/MealPlans/SearchBar'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input'
import Check from '@material-ui/icons/Check'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import { TimePicker, Table } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import 'moment/locale/es';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';

import { Pie } from 'react-chartjs-2'
import Sticky from '@wicked_query/react-sticky';
import { Alert } from 'antd';

import PDF from '../../components/MealPlans/MealPlanPDF'

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
  tPicker: {
    width: "100%"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
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
  return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
}



class MealPlanCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlan: {
        mealPlanName: "Dieta Tonificación",
        days: [{
          dayName: "Lunes",
          dailyCalories: 3000,
          dailyProtein: 200,
          dailyCarbs: 400,
          dailyFat: 250,
          meals: [{
            mealName: "Desayuno",
            mealTime: moment().set({ hour: 7, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes: [{
                type: "1 vaso de bebida de soya sin azúcar",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "1 pan pita integral con 6 aceitunas",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "40g de queso light",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
            ]
          }, {
            mealName: "Post-Entreno",
            mealTime: moment().set({ hour: 10, minute: 45, second: 0, millisecond: 0 }).toDate(),
            recipes: [{
                type: "2 scoops de proteína vegana",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "1 plátano de seda",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
            ]
          }, {
            mealName: "Almuerzo",
            mealTime: moment().set({ hour: 13, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes: [{
                type: "Ensalada de pepinillos, pimientos, espinaca y brócoli",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "2 tazas de carne de soya aderezada",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "1 camote grande al horno",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
            ]
          }, {
            mealName: "Media Tarde",
            mealTime: moment().set({ hour: 17, minute: 0, second: 0, millisecond: 0 }).toDate(),
            recipes: [{
                type: "1 naranja",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "1 taza de té verde",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
            ]
          }, {
            mealName: "Cena",
            mealTime: moment().set({ hour: 20, minute: 30, second: 0, millisecond: 0 }).toDate(),
            recipes: [{
                type: "2 scoops de proteína vegana",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
              {
                type: "1/2 almuerzo",
                calories_kcal: Math.random() * 300,
                protein_g: Math.random() * 25,
                carbs_g: Math.random() * 50,
                fat_g: Math.random() * 30
              },
            ]
          }]
        }, {
          dayName: "Martes",
          meals: []
        }, {
          dayName: "Miércoles",
          meals: []
        }, {
          dayName: "Jueves",
          meals: []
        }, {
          dayName: "Viernes",
          meals: []
        }, {
          dayName: "Sábado",
          meals: []
        }, {
          dayName: "Domingo",
          meals: []
        }]
      },
      selectedFood: "",
      selectedInputRef: "",
      dayIndex: 0,
      completed: {},
      dayIndex: 0,
      loading: false,
      success: false
    }
  };

  componentDidMount() {
    this.props.changeHeaderTitle("Crear plan alimenticio")
  }


  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  addNewMealButton = (daySelected => {
    const copy = this.state.mealPlan;
    const updated = copy.days[daySelected].meals.push({
      mealName: "",
      mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
      recipes: []
    })
    this.setState({
      mealPlan: copy
    })
  })

  handleMealTitle = (event, identifier) => {
    const copy = this.state.mealPlan;
    copy.days[identifier[0]].meals[identifier[1]].mealName = event.target.value
    this.setState({ mealPlan: copy })
  }

  handleMealPlanTitle = (event) => {
    const copy = this.state.mealPlan;
    copy.mealPlanName = event.target.value
    this.setState({ mealPlan: copy })
  }


  addNewRecipeButton = (selected, identifier) => {
    const copy = this.state.mealPlan;
    const updated = copy.days[identifier[0]].meals[identifier[1]].recipes.push({
      type: selected.foodName,
      calories_kcal: selected.calories_kcal,
      protein_g: selected.protein_g,
      carbs_g: selected.carbs_g,
      fat_g: selected.fat_g
    })
    this.setState({
      mealPlan: copy
    })
  }

  deleteRecipeButton = (identifier) => {
    const copy = this.state.mealPlan;
    const updated = copy.days[identifier[0]].meals[identifier[1]].recipes.splice(identifier[2], 1);
    this.setState({
      mealPlan: copy
    })
  }

  deleteMealButton = (identifier) => {
    const copy = this.state.mealPlan;
    const updated = copy.days[identifier[0]].meals.splice(identifier[1], 1);
    this.setState({
      mealPlan: copy
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
    }
    else {
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

  //Pie chart
  mealCalories = (array) => {
    var totalCalories = 0;
    var totalNutrient = array.recipes.map(meal => {
      totalCalories += meal.calories_kcal;
    })
    return Math.round(totalCalories * 100) / 100
  }

  pieData(array) {
    function totalNutrients() {
      var [totalProt, totalFat, totalCarbs] = [0, 0, 0];
      var totalNutrient = array.recipes.map(meal => {
        totalProt += meal.protein_g;
        totalFat += meal.fat_g;
        totalCarbs += meal.carbs_g;
      })
      return [Math.round(totalProt * 100) / 100, Math.round(totalFat * 100) / 100, Math.round(totalCarbs * 100) / 100]
    };

    const data = {
      labels: [
        'Proteína (g)',
        'Grasa (g)',
        'Carbohidratos (g)'
      ],
      datasets: [{
        data: totalNutrients(),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]

    };
    return data
  }

  handleFinishButton = () => {
    if (!this.state.loading) {
      this.setState({
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
            const { completed } = this.state;
            completed[this.state.dayIndex] = true;
            this.setState({
              completed,
            });
            this.handleNext();
          }, 2000);
        },
      );
    }
  };

  totalNutrients = (dayIdx) => {
    var totalCalories = 0
    var totalProt = 0
    var totalCarbs = 0
    var totalFat = 0;
    this.state.mealPlan.days[dayIdx].meals.map(meal => {
      var mealCalories = 0
      var mealProt = 0
      var mealCarbs = 0
      var mealFat = 0;
      meal.recipes.map(food => {
        mealCalories += food.calories_kcal;
        mealProt += food.protein_g;
        mealCarbs += food.carbs_g;
        mealFat += food.fat_g;
      })
      totalCalories += mealCalories;
      totalProt += mealProt;
      totalCarbs += mealCarbs;
      totalFat += mealFat;
    })
    return [Math.round(totalCalories * 100) / 100, Math.round(totalProt * 100) / 100, Math.round(totalCarbs * 100) / 100, Math.round(totalFat * 100) / 100]
  };

  //summaryTable functions
  getSummaryTable = (dayIdx) => {
    const macros = ["Calorías (kcal)", "Proteína (g)", "Grasa (g)", "Carbohidratos (g)"]
    //get target
    const targetMacro = [this.state.mealPlan.days[dayIdx].dailyCalories, this.state.mealPlan.days[dayIdx].dailyProtein, this.state.mealPlan.days[dayIdx].dailyFat, this.state.mealPlan.days[dayIdx].dailyCarbs]
    //get actual
    const total = this.totalNutrients(dayIdx)
    //get difference
    const dataList = macros.map(function(macro, macroIndex) {
      return { key: macroIndex, macro: macro, actual: total[macroIndex], target: targetMacro[macroIndex], remain: Math.round((targetMacro[macroIndex] - total[macroIndex]) * 100) / 100 }
    })
    return dataList
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { dayIndex } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success,
    });

    const columns = [{
      title: `${getSteps()[dayIndex]}`,
      dataIndex: 'macro',
      width: 120
    }, {
      title: 'Actual',
      dataIndex: 'actual',
      width: 60
    }, {
      title: 'Objetivo',
      dataIndex: 'target',
      width: 75
    }, {
      title: 'Restante',
      dataIndex: 'remain',
      width: 78
    }];

    return (
      <div>
        <Link to='/dietas'>Click para ir a /dietas </Link>  
        <div className={classes.root}>
        {this.allStepsCompleted() ? ( 
          <div>
            <Grid container alignItems="center">
              <Grid item>
                  <Alert
                    message="Has completado satisfactoriamente el plan alimenticio para Juan O'leary"
                    description="Previsualízalo aquí."
                    type="success"
                    showIcon
                  />
                <Typography>
                  RESUMEN DEL MEALPLAN:
                  {/*JSON.stringify(this.state.mealPlan)*/}
                </Typography>
                <PDF plan={this.state.mealPlan} hola={"si, hola"}/>
              </Grid>
            </Grid>
            <Button variant="outlined" color="secondary" onClick={this.handleReset}>Resetear</Button>
          </div>
          ) : (
          <Grid container alignItems="center" justify="space-between">
            <Grid item md={5} xs={12} style={{textAlign:"center"}}>
              <div>Paciente: Juan O'leary</div>
              <TextField inputProps={{style:{padding:"10px 20px",textAlign:"center"}}} style={{margin:"20px 20px"}} id="outlined-bare" variant="filled" value={this.state.mealPlan.mealPlanName} onChange={this.handleMealPlanTitle}/>
              <Stepper nonLinear activeStep={dayIndex} alternativeLabel style={{padding:"0", backgroundColor:"#fafafa"}}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepButton
                        onClick={this.handleStep(index)}
                        completed={this.state.completed[index]}
                        icon={label.substr(0,1)}
                      >
                        {label.substr(0,3)}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
            <Grid item md={2} xs={12} style={{textAlign:"center"}}>
            </Grid>
            {this.allStepsCompleted() && 
            <Grid item md={5} xs={12} style={{textAlign:"right"}}>
              <Sticky>
                <div style={{backgroundColor:"white"}}>
                   <Table columns={columns} dataSource={this.getSummaryTable(dayIndex)} size="small" pagination={false}/>
                </div>
              </Sticky>
            </Grid>
            }
          </Grid>
          )
        }
          <div>
            {!this.allStepsCompleted() && (
              <div>
                <div>
                  <div key={dayIndex}>
                      {this.state.mealPlan.days[dayIndex].meals.map((meal, mealIndex) =>
                          <div key={dayIndex+"-"+mealIndex}>
                            <hr/>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                              <Grid item md={12} xs={12} style={{textAlign:"center", margin:"5px"}}>
                                <TextField inputProps={{style:{padding:"10px 5px",textAlign:"center", fontSize:"0.9rem"}}} style={{margin:"0px 20px"}} id="outlined-bare" variant="outlined" value={meal.mealName=="" ? "Comida "+(mealIndex+1) : meal.mealName} onChange={e=>{this.handleMealTitle(e,[dayIndex,mealIndex])}}/>
                              </Grid>
                              <Grid item md={12} xs={12}>
                                <Grid container>
                                  <Grid item md={1} xs={12} style={{textAlign:"center"}}>
                                    <Grid container direction="row" justify="space-between" alignItems="center" style={{height:"100%"}}>
                                      <Grid item xs={12}>
                                        <TimePicker className={classes.tPicker} suffixIcon use12Hours defaultValue={moment(meal.mealTime)} format={"h:mma"} minuteStep={5} allowEmpty={false}/>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <IconButton aria-label="Delete" className={classes.margin} onClick={e=>this.deleteMealButton([dayIndex,mealIndex])}>
                                          <DeleteIcon fontSize="large" style={{ color: "red" }} />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item md={5} xs={12}>
                                    <ol>
                                    {meal.recipes.length==0 && 
                                      <div>No tienes alimentos agregados para esta comida.</div>
                                    }
                                    {
                                      meal.recipes.map((alimento, alimentoIndex) => 
                                      <div key={dayIndex+"-"+mealIndex+"-"+alimentoIndex}>
                                        <li>
                                          <Input value={alimento.type} style={{width:"75%", fontSize:"0.8rem"}}/>
                                          <IconButton aria-label="Delete" onClick={e=>(this.deleteRecipeButton([dayIndex,mealIndex,alimentoIndex]))}>
                                            <Clear fontSize="small" style={{ color: "red" }}/>
                                          </IconButton>
                                        </li>
                                      </div>
                                      )
                                    }
                                    </ol>
                                  </Grid>
                                  <Grid item md={3} xs={6}>
                                    {meal.recipes.length==0 ? null : (
                                    <div>
                                      <Pie data={this.pieData(meal)} legend={{display:false}}/>
                                      <div style={{textAlign:"center"}}>Calorías: {this.mealCalories(meal)}</div>
                                    </div>
                                    )}
                                  </Grid>
                                  <Grid item md={3} xs={12} style={{textAlign:"right"}}>
                                  </Grid>
                                  <Grid container direction="row" justify="center" alignItems="flex-start">
                                    <Grid item md={9} xs={12}>
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
                <Grid container direction="row" alignItems="center" justify="center" style={{margin:"20px 0px"}}>
                  <Grid item md={5} style={{ textAlign:"center" }}>
                    <MuiThemeProvider theme={theme}>
                      <Button variant="outlined" color="primary" className={classes.margin} onClick={e=>{this.addNewMealButton(dayIndex)}}>
                        <AddIcon/><Typography>Agregar comida</Typography>
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{margin:"20px 0px", height:"100%"}}>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    {dayIndex==0 ? null : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={dayIndex === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Anterior día
                    </Button>
                    )}
                  </Grid>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    {dayIndex !== steps.length &&
                      (this.state.completed[this.state.dayIndex] ? (
                        <Typography variant="caption" className={classes.completed}>
                          {getSteps()[dayIndex]} está completado
                        </Typography>
                      ) : (
                      this.completedSteps() === this.totalSteps() - 1 ? (
                      <div className={classes.wrapper}>
                        <Button variant="contained" color="primary" className={buttonClassname} disabled={this.state.loading} onClick={this.handleFinishButton}>
                          Enviar al paciente
                        </Button>
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                      ) : (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          <Check/> Día terminado
                        </Button>
                      )))}
                  </Grid>
                  <Grid item md={2} style={{ textAlign:"center" }}>
                    {dayIndex==6 ? null :(
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {"Ir a "+getSteps()[dayIndex+1]}
                    </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}


MealPlanCreate.propTypes = {
  classes: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    foods: state.foods,
    currentUserId: state.currentUser.user.id
  };
};


export default connect(mapStateToProps, { fetchFoods })(withStyles(styles)(MealPlanCreate));
