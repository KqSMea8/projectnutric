import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {fetchFoods} from '../../store/actions/foods';
import {connect} from 'react-redux';
import TableResult from '../../components/MealPlans/TableResult'
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SearchBar extends React.Component {
  constructor(props){
    super(props);
      this.state={
        searchedFood:"",
        tableHide:true,
        text:""
      }
  }

  onSearchingFood = event => {
    this.setState({
        searchedFood: event.target.value
    }, function(){
      const { currentUserId } = this.props;
      // arreglar el query: si pongo camo (para camote), aparece tequeños con guaCAMOle
      if(this.state.searchedFood.length>=3){
        this.props.fetchFoods(currentUserId,this.state.searchedFood);
      } else {
        return "";
      }
    })
  }

  showsTable = (e) => {
    this.setState({ text: e.target.value, tableHide:true });
    if(e.target.value.length>=3){
      this.setState({tableHide:false})
    }
  };

  clearInput=e=>{
    this.setState({text:"",tableHide:true})
  }
  
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <TextField
          id="input-with-icon-textfield"
          value={this.state.text}
          placeholder="Agregar alimento..."
          className={classes.textField}
          onChange={(e)=> { this.showsTable(e); this.onSearchingFood(e);}}
          onFocus={this.clearInput}
          margin="none"
          autoComplete="off"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        />
        {!this.state.tableHide ? <TableResult clearInput={this.clearInput} selectedInputIdentifier={this.props.selectedInputIdentifier} selectedFood={this.props.selectedFood} addNewRecipeButton={this.props.addNewRecipeButton}/> : null}      
      </div>
    );
  }
}



function mapStateToProps(state){
  return{
    foods: state.foods,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, {fetchFoods})(withStyles(styles)(SearchBar))
