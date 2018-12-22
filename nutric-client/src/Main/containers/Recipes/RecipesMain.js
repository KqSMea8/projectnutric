import React, { Component }  from 'react';
import RecipeList from '../../components/Recipes/RecipeList'
import ButtonPopup from '../../components/Recipes/Button-Popup'
import {fetchRecipes} from '../../store/actions/recipes';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});



class RecipesMain extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount(){
    const { currentUserId } = this.props;
    this.props.fetchRecipes(currentUserId, console.log('recipes fetched'));}
    

  render(){
    const { classes } = this.props;
    const numRows = 10;
    const { recipes } = this.props;
    let RecipesList = recipes.map(recipe => {
      let { recipeName, ingredients, category, createdAt } = recipe;
      let ingredientesLength = ingredients.length;
      let DateOfCreation = createdAt.slice(0,10)
      return (
        ['recipeName', 'category', 'DateOfCreation', 'ingredientesLength'] 
      )
    });
    
  
    return (
      <div>
        <ButtonPopup/>
      <Grid container>
        <Grid item style={{paddingRight: '30px', flex: 2}}>
          <RecipeList data={RecipesList} numRows={numRows} />
        </Grid>
      </Grid>
      
 
      </div>
      
    )

  }
  
};

function mapStateToProps(state){
  return{
    recipes: state.recipes,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchRecipes}) (withStyles(styles)(RecipesMain))
  
  