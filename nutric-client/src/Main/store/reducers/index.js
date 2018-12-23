import { combineReducers } from 'redux';
import currentUser from './currentUserReducer';
import errors from './errorReducer';
import patients from './patientsReducer';
import appointments from './appointmentsReducer';
import foods from './foodsReducer';
import recipes from './recipesReducer';
import mealPlanTemplates from './mealPlanTemplatesReducer';
import mealPlans from './mealPlansReducer';
import billingPlans from './BillingPlansReducer';

const rootReducer = combineReducers({
  currentUser,
  errors,
  patients,
  appointments,
  foods,
  recipes,
  mealPlanTemplates,
  mealPlans,
  billingPlans
});

export default rootReducer;