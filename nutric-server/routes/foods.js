const express = require("express");
const router = express.Router({ mergeParams: true });
const { getFoods } = require("../handlers/foods");


const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/foods
router.get("/", loginRequired, ensureCorrectUser, getFoods);


module.exports = router;