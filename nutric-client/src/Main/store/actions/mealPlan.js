import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MEAL_PLANS, REMOVE_MEAL_PLAN} from '../actionTypes';

export const loadMealPlans = (mealPlans) => ({
  type: LOAD_MEAL_PLANS,
  mealPlans
});

// export const remove = id => ({
//   type: REMOVE_MEAL_PLAN,
//   id: id
// });


export const fetchMealPlans = (expert_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/mealPlan`)
      .then(res => {
        dispatch(loadMealPlans(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};

// export const removeMealPlanTemplate = (expert_id, mealPlanTemplate_id) => {
//   return dispatch => {
//     return apiCall("delete", `/api/experts/${expert_id}/mealPlanTemplate/${mealPlanTemplate_id}`)
//       .then(() => dispatch(remove(mealPlanTemplate_id)))
//       .catch(err => {
//         addError(err.message);
//       });
//   };
// };