const express = require("express");
const router = express.Router();
const {signup, login } = require("../handlers/expertAuth");
const {createPatient, getPatient} = require("../handlers/patients");

const database = require('../models');

//Middleware for authet and authorization
const {loginRequired, ensureCorrectUser} = require("../middleware/auth")


router.post("/signup", signup);
router.post("/login", login);
router.get("/", async function(req, res, next){
    try {
        let experts = await database.Expert.find()
        .populate("expert", {
            firstName: true,
        }).limit();
        return res.status(200).json(experts);
    } catch(err){
        return next(err);
    }
})

router.get("/:expert_id/patients", loginRequired, getPatient);
router.post("/:expert_id/patients/create",loginRequired, createPatient);

module.exports=router;