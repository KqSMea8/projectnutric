import { LOAD_FOODS } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_FOODS:
      return [...action.foods];
    default: 
      return state;
  }
};