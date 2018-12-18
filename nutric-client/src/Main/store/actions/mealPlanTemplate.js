import { apiCall } from '../services/api';
import { addError } from './errors';
import { LOAD_MEAL_PLAN_TEMPLATES } from '../actionTypes';

export const loadMealPlanTemplates = (mealPlanTemplates) => ({
  type: LOAD_MEAL_PLAN_TEMPLATES,
  mealPlanTemplates
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