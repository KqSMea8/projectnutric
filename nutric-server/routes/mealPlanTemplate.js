const express = require("express");
const router = express.Router({mergeParams:true});
const { createMealPlanTemplate, deleteMealPlanTemplate, editMealPlanTemplate, getMealPlanTemplates, getOneMealPlanTemplate } = require("../handlers/mealPlanTemplate");

//Middleware for authentication and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/mealPlanTemplate'
router
  .get("/", loginRequired, ensureCorrectUser, getMealPlanTemplates) //
  .post("/", loginRequired, ensureCorrectUser, createMealPlanTemplate)
  
  .get("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, getOneMealPlanTemplate) //en el perfil del paciente mapear para ver progreso
  .put("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, editMealPlanTemplate)
  .delete("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, deleteMealPlanTemplate);


module.exports = router;