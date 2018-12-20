const express = require("express");
const router = express.Router({mergeParams:true});
const { findFoods, createMealPlan, getMealPlans } = require("../handlers/mealPlan");

//Middleware for authentication and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/mealPlan'
router
  .get("/", loginRequired, ensureCorrectUser, getMealPlans) 
  .post("/:patient_id", loginRequired, ensureCorrectUser, createMealPlan)

 // .get("/:mealPlan_id", loginRequired, ensureCorrectUser, getOneMealPlan) //en el perfil del paciente mapear para ver progreso
  // .put("/:mealPlan_id", loginRequired, ensureCorrectUser, editMealPlan)
  // .delete("/:mealPlan_id", loginRequired, ensureCorrectUser, deleteMealPlan);


module.exports = router;