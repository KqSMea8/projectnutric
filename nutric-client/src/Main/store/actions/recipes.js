import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_RECIPES } from '../actionTypes';

export const loadRecipes = (recipes) => ({
  type: LOAD_RECIPES,
  recipes: recipes
});

export const fetchRecipes = (expert_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/recipes`)
      .then(res => {
        dispatch(loadRecipes(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};