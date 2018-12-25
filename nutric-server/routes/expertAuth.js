const express = require("express");
const router = express.Router();
const {signup, login, forgotPassword} = require("../handlers/expertAuth");


// prefix: /api/experts/
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);

module.exports = router;

