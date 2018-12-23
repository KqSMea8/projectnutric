const express = require("express");
const router = express.Router({mergeParams:true});
const {createAppointment, getAppointments, editAppointment, deleteAppointment, getOneAppointment} = require("../handlers/appointments");

//Middleware for authentication and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/appointments'
router
  .get('/', loginRequired, ensureCorrectUser, getAppointments) //en el perfil del paciente mapear para ver progreso
  .post("/", loginRequired, ensureCorrectUser, createAppointment)
  
  .get('/:appointment_id', loginRequired, ensureCorrectUser, getOneAppointment)
  .put('/:appointment_id', loginRequired, ensureCorrectUser, editAppointment)
  .delete('/:appointment_id', loginRequired, ensureCorrectUser, deleteAppointment);


module.exports = router;