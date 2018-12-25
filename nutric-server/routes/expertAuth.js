const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetToken } = require("../handlers/expertAuth");


// prefix: /api/experts/
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.get("reset/:token", resetToken)

module.exports = router;
