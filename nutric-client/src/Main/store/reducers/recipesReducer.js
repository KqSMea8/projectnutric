import { LOAD_RECIPES } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_RECIPES:
      return [...action.recipes];
    default: 
      return state;
  }
};