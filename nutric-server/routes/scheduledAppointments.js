const express = require("express");
const router= express.Router({mergeParams:true});
const {createScheduledAppointment, getScheduledAppointments, getOneScheduledAppointment, editScheduledAppointment, deleteScheduledAppointment} = require("../handlers/scheduledAppointments");

//Middleware for authet and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth")

// prefix: /api/experts/:expert_id/scheduledappointments'

router
  .get("/", loginRequired, ensureCorrectUser, getScheduledAppointments) //mostrar todas las consultas agendadas de un nutri
  .post("/", loginRequired, ensureCorrectUser, createScheduledAppointment)
  .put("/:scheduledAppointment_id", loginRequired, ensureCorrectUser, editScheduledAppointment)
  .delete("/:scheduledAppointment_id", loginRequired, ensureCorrectUser, deleteScheduledAppointment);


module.exports = router;