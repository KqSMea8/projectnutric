import { LOAD_PATIENTS } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_PATIENTS:
      return [...action.patients];
    default: 
      return state;
  }
};