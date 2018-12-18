import { combineReducers } from 'redux';
import currentUser from './currentUserReducer';
import errors from './errorReducer';
import patients from './patientsReducer';
import appointments from './appointmentsReducer';
import foods from './foodsReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({
  currentUser,
  errors,
  patients,
  appointments,
  foods,
  recipes
});

export default rootReducer;