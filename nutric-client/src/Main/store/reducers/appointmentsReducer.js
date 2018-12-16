import { LOAD_APPOINTMENTS } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_APPOINTMENTS:
      return [...action.appointments];
    default: 
      return state;
  }
};