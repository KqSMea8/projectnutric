const express = require("express");
const router = express.Router({mergeParams:true});
const { findFoods, createMealPlan } = require("../handlers/mealPlan");

//Middleware for authentication and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/mealplan'
router
  .get("/", loginRequired, ensureCorrectUser, findFoods) 
  .post("/:patient_id", loginRequired, ensureCorrectUser, createMealPlan)
  
 // .get("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, getOneMealPlan) //en el perfil del paciente mapear para ver progreso
  // .put("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, editMealPlan)
  // .delete("/:mealPlanTemplate_id", loginRequired, ensureCorrectUser, deleteMealPlan);


module.exports = router;