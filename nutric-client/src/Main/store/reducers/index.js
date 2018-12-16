import { combineReducers } from 'redux';
import currentUser from './currentUserReducer';
import errors from './errorReducer';
import patients from './patientsReducer';
import appointments from './appointmentsReducer';
import foods from './foodsReducer';

const rootReducer = combineReducers({
  currentUser,
  errors,
  patients,
  appointments,
  foods
});

export default rootReducer;