import { LOAD_MEAL_PLAN_TEMPLATES, REMOVE_MEAL_PLAN_TEMPLATE } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_MEAL_PLAN_TEMPLATES:
      return [...action.mealPlanTemplates];
    case REMOVE_MEAL_PLAN_TEMPLATE:
      return state.filter(mealPlanTemplate => mealPlanTemplate._id !== action.id);
    default: 
      return state;
  }
};