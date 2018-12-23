import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_BILLINGPLANS } from '../actionTypes';

export const loadBillingPlans = (billingPlans) => ({
  type: LOAD_BILLINGPLANS,
  billingPlans: billingPlans
});

export const fetchBillingPlans = (expert_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/billingPlans`)
      .then(res => {
        dispatch(loadBillingPlans(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};