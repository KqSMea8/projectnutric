const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const { getBillingPlans, createBillingPlan} = require("../handlers/billingPlans");


const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/experts/:expert_id/billingPlans


router.get("/", loginRequired, ensureCorrectUser, getBillingPlans);
router.post("/create", loginRequired, ensureCorrectUser, createBillingPlan);


module.exports = router;