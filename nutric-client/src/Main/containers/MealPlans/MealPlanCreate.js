import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchFoods} from '../../store/actions/foods'
import SearchBar from '../../components/MealPlans/SearchBar'

class MealPlanCreate extends Component{
  constructor(props){
    super(props);
    this.state = { 
      lunes:[
          ['leche','huevo','pan con soque'],
          ['  aji de gallina', 'lomo saltado', 'inca mierda']
        ]
    }
  };
      
      
    handleClickPlus = (e) => {
    const actualMeal = this.state.lunes.length-1;
    this.setState({ lunes:
      [...this.state.lunes, 
       [this.state.lunes[actualMeal].push((e.target).parentElement.parentElement.cells[0].innerText)]
      ]
    })
  };

 
    AddNewMeal = (e) => {
      this.setState( { lunes:[
        ...this.state.lunes,[]
      ]})
  };
 
  
  render(){
    const {foods}=this.props
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
            this.state.lunes.map((comida,index) => 
                <div>
                    <h4 key={index}>Comida {index+1}</h4>
                    <ol>
                    { 
                        comida.map((alimento, subindex) =>
                            <li key={subindex}>{alimento}</li>)
                    }
                    </ol>
                </div>
            )
        }
 
        <button onClick={this.AddNewMeal}> Agregar Comida </button>
        
        <SearchBar/>
        
          {foods.map((food, key) => {
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
                    <td style={dataStyle} ><button onClick={this.handleClickPlus}> + </button></td>
                  </tr>
                </table>
             </div>
            );
          })}
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
