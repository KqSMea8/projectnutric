import React, { Component }  from 'react';
import RecipeList from '../../components/Recipes/RecipeList'
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
    const numRows = 10 //num de filas q sera el default en la tabla
    const { recipes } = this.props;
    let RecipesList = recipes.map(recipe => {
      const { recipeName, ingredients, mealPlans, timestamps } = recipe;
      return (
        [recipeName, 'ingredients', 'mealPlans', 'timestamps']
      )
    });
    
  
    return (
      <div>
      <Grid container>
        <Grid item xs={12} sm={8} md ={8}>
         <TextField
            label="Recetas"
            style={{ margin: 15}}
            placeholder="Busca una receta"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} >
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >Crear Nueva Receta
          </Button>
        </Grid>  
      </Grid>
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
  
  