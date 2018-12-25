const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetToken, updatePassword } = require("../handlers/expertAuth");


// prefix: /api/experts/
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.get("/reset/:token", resetToken)
router.put("/updatePassword", updatePassword)

module.exports = router;
