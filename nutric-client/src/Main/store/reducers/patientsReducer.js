import { LOAD_PATIENTS, DELETE_PATIENT } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_PATIENTS:
      return [...action.patients];
    case DELETE_PATIENT:
      return state.filter(patient => patient._id !== action.id);
    default: 
      return state;
  }
};