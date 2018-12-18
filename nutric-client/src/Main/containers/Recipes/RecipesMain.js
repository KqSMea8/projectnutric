import React, { Component }  from 'react';
import RecipeList from '../../components/Recipes/RecipeList'
import {fetchRecipes} from '../../store/actions/recipes';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



class RecipesMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount(){
    const { currentUserId } = this.props;
    this.props.fetchRecipes(currentUserId, console.log('recipes fetched'));}

  render(){
    const numRows = 10 //num de filas q sera el default en la tabla
    const { recipes } = this.props;
    let RecipesList = recipes.map(recipe => {
      const { recipeName, ingredients, mealPlans, timestamps } = recipe;
      return (
        [recipeName, 'ingredients', 'mealPlans', 'timestamps']
      )
    });
    
  
    return (
      <Grid container>
        
        <Grid item style={{paddingRight: '30px', flex: 2}}>
          <RecipeList data={RecipesList} numRows={numRows} />
        </Grid>

     
      </Grid>
    )

  }
  
};

function mapStateToProps(state){
  return{
    recipes: state.recipes,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchRecipes})(RecipesMain);
  
  