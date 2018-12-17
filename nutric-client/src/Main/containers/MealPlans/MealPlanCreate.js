import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        }]
      },
      selectedFood:""
    }
  };
  
      
      
  //   handleClickPlus = (e) => {
  //   const actualMeal = this.state.lunes.length-1;
  //   this.setState(state=> {
  //     const lunes=state[actualMeal].push((e.target).parentElement.parentElement.cells[0].innerText)
  //     return{
  //       lunes,
  //     }
  //   })
  // };

  addNewMealButton = ()=>{
    //Mostramos el número de comidas para el día lunes
    alert("Número de comidas: \r\n-lunes: "+this.state.mealPlan.days[0].meals.length+"\r\n-martes: "+this.state.mealPlan.days[1].meals.length)
    const copy=this.state.mealPlan;
    const lastDay=copy.days.length
    const updated=copy.days[lastDay-1].meals.push(
          {
            mealName:"Desayuno",
            mealTime: moment().set({ hour: 8, minute: 30, second: 0, millisecond: 0 }),
            recipes:[]
          }
      )

    this.setState({
      mealPlan:copy
    })
  }
  
  addNewRecipeButton = (selected)=>{
    const copy=this.state.mealPlan;
    //Lo unico que necesitamos es determinar dinámicamente lastDay y lastMeal, según la ubicación del searchBar
    const lastDay=copy.days.length
    const lastMeal=copy.days[lastDay-1].meals.length  
    const updated=copy.days[lastDay-1].meals[lastMeal-1].recipes.push(
      {type: selected.name}//nombre de la comida
      )
        console.log(copy)
    this.setState({
      mealPlan:copy
    })
  }


  
  render(){
    const {foods}=this.props
    const {openTable}=this.state
    
    //styles
    const tableStyle = {
      borderCollapse: 'collapse',
      width: '50%'
    }
    const dataStyle = {
      border: '1px solid #dddddd',
      textAlign: 'center',
      padding: '8px',
    }
    const headingsStyle = {
      backgroundColor: '#dddddd',
      width: '100%'
    }

    
    return (
      <div>
        <Link to='/dietas'>Click para ir a /dietas </Link>  
        {
            this.state.mealPlan.days.map((day,dayIndex) => 
                <div>
                    <h4 key={dayIndex}>{day.dayName}</h4>
                    <ul>
                    { 
                        day.meals.map((meal, mealIndex) =>
                          <div>
                            <li key={mealIndex}>
                              <Input defaultValue={meal.mealName}/>
                              <TimePicker use12Hours defaultValue={moment(meal.mealTime)} format={"h:mm a"} minuteStep={5} allowEmpty={false}/>
                            </li>
                            <ol>
                            {meal.recipes.length==0 && (
                                  <li key={"input"}>
                                    <SearchBar tableId={dayIndex+"-"+mealIndex+"-"} addNewRecipeButton={this.addNewRecipeButton}/>
                                  </li>
                              )}
                            {
                              meal.recipes.map((alimento, alimentoIndex) => 
                              <div>
                                <li key={alimento}>
                                  <Input defaultValue={alimento.type}/>
                                  <IconButton aria-label="Delete">
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </li>
                                {(meal.recipes.length==alimentoIndex+1)  && 
                                  <li key={"input"+alimentoIndex}>
                                    <SearchBar tableId={dayIndex+"-"+mealIndex+"-"+alimentoIndex} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
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
            )
        }
 
        <Button variant="contained" color="primary" onClick={this.addNewMealButton}>
          Agregar comida (para el martes)
        </Button>

   
        
      {/*Sorry sven, voy a tener que borrar lo siguiente:*?}
      
          {/*foods.map((food, key) => {
            return (
              <div key={key}>
                <table style={tableStyle}>
                  <tr style={headingsStyle}>
                    <th>Nombre</th>
                    <th>Calorias</th>
                    <th>Proteinas</th>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                    <th>Agregar alimento </th>
                  </tr>
                  <tr>
                    <td style={dataStyle} >{food.foodName}</td>
                    <td style={dataStyle} >{food.calories_kcal}</td>
                    <td style={dataStyle} >{food.protein_g}</td>
                    <td style={dataStyle} >{food.carbs_g}</td>
                    <td style={dataStyle} >{food.fat_g}</td>
                    <td style={dataStyle} >
                      <Fab size="small"  color="secondary" aria-label="Add">
                        <AddIcon />
                      </Fab>
                    </td>
                  </tr>
                </table>
             </div>
            );
          })*/}
      </div>
    );
  }}
  
  
function mapStateToProps(state){
  return{
    foods: state.foods,
    currentUserId: state.currentUser.user.id
  };
};

  
export default connect(mapStateToProps, {fetchFoods})(MealPlanCreate);
