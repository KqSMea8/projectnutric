import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {fetchFoods} from '../../store/actions/foods';
import {connect} from 'react-redux';

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
  state = {
    searchedFood: "",
  };

  onChange = e => {
    this.setState({
        searchedFood: e.target.value
    }, function(){
      const { currentUserId, foods } = this.props;
      // arreglar el query: si pongo camo (para camote), aparece tequeños con guaCAMOle
      if(this.state.searchedFood.length>=3){
        this.props.fetchFoods(currentUserId,this.state.searchedFood);
      } else {
        this.props.fetchFoods(currentUserId,"");
      }
    })
  }
  
  
  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    console.log(this.state.searchedFood);
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
        <TextField
          id="standard-name"
          label=" + Alimento"
          placeholder="Agrega un alimento"
          className={classes.textField}
          value={this.state.value}
          onChange={this.onChange}
          margin="normal"
        />
      </form>
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
