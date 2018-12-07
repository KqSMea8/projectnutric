const express= require("express");
const router= express.Router({mergeParams:true});

const {createPatient, getPatients, getOnePatient, editPatient, deletePatient} = require("../handlers/patients");

//Middleware for authet and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth")

// prefix: /api/experts/:expert_id/patients'
router
  .get("/", loginRequired, ensureCorrectUser, getPatients) //todos los pacientes, para mostrarlos en seccion pacientes
  .post("/", loginRequired, ensureCorrectUser, createPatient)
  .get('/:patient_id', loginRequired, ensureCorrectUser, getOnePatient) //un paciente, para pagina del perfil, populate con los modelos de referencia (meals, measurement)
  .put("/:patient_id", loginRequired, ensureCorrectUser, editPatient)
  .delete("/:patient_id", loginRequired, ensureCorrectUser, deletePatient);

module.exports = router;