import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_FOODS } from '../actionTypes';

export const loadFoods = (foods) => ({
  type: LOAD_FOODS,
  foods: foods
});

export const fetchFoods = (expert_id,foundFood) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/mealplan/?foundFood=${foundFood}`)
      .then(res => {
        dispatch(loadFoods(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};