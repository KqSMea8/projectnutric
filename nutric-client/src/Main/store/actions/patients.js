import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_PATIENTS } from '../actionTypes';

export const loadPatients = (patients) => ({
  type: LOAD_PATIENTS,
  patients: patients
});

export const fetchPatients = (expert_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/patients`)
      .then(res => {
        dispatch(loadPatients(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};