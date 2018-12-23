import { LOAD_BILLINGPLANS } from '../actionTypes';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOAD_BILLINGPLANS:
      return [...action.billingPlans];
    default: 
      return state;
  }
};

