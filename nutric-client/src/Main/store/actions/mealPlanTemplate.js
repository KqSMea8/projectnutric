import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MEAL_PLAN_TEMPLATES, REMOVE_MEAL_PLAN_TEMPLATE } from '../actionTypes';

export const loadMealPlanTemplates = (mealPlanTemplates) => ({
  type: LOAD_MEAL_PLAN_TEMPLATES,
  mealPlanTemplates
});

export const remove = id => ({
  type: REMOVE_MEAL_PLAN_TEMPLATE,
  id: id
});


export const fetchMealPlanTemplates = (expert_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/mealPlanTemplate`)
      .then(res => {
        dispatch(loadMealPlanTemplates(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};

export const removeMealPlanTemplate = (expert_id, mealPlanTemplate_id) => {
  return dispatch => {
    return apiCall("delete", `/api/experts/${expert_id}/mealPlanTemplate/${mealPlanTemplate_id}`)
      .then(() => dispatch(remove(mealPlanTemplate_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};