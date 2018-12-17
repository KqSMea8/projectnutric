import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {fetchFoods} from '../../store/actions/foods';
import {connect} from 'react-redux';
import TableResult from '../../components/MealPlans/TableResult'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
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
        this.props.fetchFoods(currentUserId,"");
      }
    })
  }

  showsTable = (e) => {
    this.setState({ text: e.target.value, tableHide:true });
    if(e.target.value.length>=3){
      this.setState({tableHide:false})
    }
  };
  
  onSelectInput = (event) => {
    const selectedInput=event.target
    
  }

  
  render() {
    const { classes, tableId } = this.props;
    
    function onSelectInput(e){
      console.log(this.ref.this.props.ref)
    }
    
    return (
      <div>
        <TextField
          id="standard-name"
          value={this.state.text}
          placeholder="Agregar alimento..."
          className={classes.textField}
          onChange={(e)=> { this.showsTable(e); this.onSearchingFood(e);}}
          margin="normal"
          onClick={onSelectInput}
        />
        {!this.state.tableHide ? <TableResult selectedFood={this.props.selectedFood} addNewRecipeButton={this.props.addNewRecipeButton}/> : null}      </div>
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
