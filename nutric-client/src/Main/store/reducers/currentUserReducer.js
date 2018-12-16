import {SET_CURRENT_USER} from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {} //toda la info del nutricionista cuando se loggee
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case SET_CURRENT_USER:
        return {
          // si hay keys en objeto user, es porque existe, y entonces esta auth
          isAuthenticated: Object.keys(action.user).length > 0,
          user: action.user
        };
    default: 
      return state;
  }
};