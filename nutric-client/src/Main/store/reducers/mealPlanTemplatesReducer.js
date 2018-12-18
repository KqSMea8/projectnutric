import { LOAD_MEAL_PLAN_TEMPLATES } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_MEAL_PLAN_TEMPLATES:
      return [...action.mealPlanTemplates];
    default: 
      return state;
  }
};