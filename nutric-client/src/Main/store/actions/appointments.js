import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_APPOINTMENTS } from '../actionTypes';

export const loadAppointments = (appointments) => ({
  type: LOAD_APPOINTMENTS,
  appointments
});

// sacar expert_id del componente donde se llame fetchAppointments
export const fetchAppointments = (expert_id) => { 
  return (dispatch) => {
    return apiCall("get", `/api/experts/${expert_id}/scheduledappointments`)
      .then(res => {
        dispatch(loadAppointments(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
    
  };
};