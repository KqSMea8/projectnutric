import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_PATIENTS, DELETE_PATIENT } from '../actionTypes';

export const loadPatients = (patients) => ({
  type: LOAD_PATIENTS,
  patients: patients
});

export const removePatient = id => ({
  type: DELETE_PATIENT,
  id
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

export const addPatient = (
  expert_id, 
  firstName, 
  lastName, 
  mail, 
  phone,
  gender,
  birthDate,
  nationality,
  idNumber,
  address, 
  ) => (dispatch, getState) => {
  return apiCall("post", `/api/experts/${expert_id}/patients`, { firstName, lastName, mail, phone, gender, birthDate, nationality, idNumber, address }) //uso de ES6
    .then(res => (console.log('added patient with the following data: ' + res)))
    .catch(err => dispatch(addError(err.message)))
};


export const deletePatient = (expert_id, patient_id) => {
  return dispatch => {
    return apiCall("delete", `/api/experts/${expert_id}/patients/${patient_id}`)
      .then(() => dispatch(removePatient(patient_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};