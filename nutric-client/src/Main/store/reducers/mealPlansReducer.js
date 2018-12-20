import { LOAD_MEAL_PLANS } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_MEAL_PLANS:
      return [...action.mealPlans];
    default: 
      return state;
  }
};