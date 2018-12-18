const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const { getRecipes, createRecipe } = require("../handlers/recipes");


const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/recipes


router.get("/", loginRequired, ensureCorrectUser, getRecipes);
router.post("/", loginRequired, ensureCorrectUser, createRecipe);


module.exports = router;