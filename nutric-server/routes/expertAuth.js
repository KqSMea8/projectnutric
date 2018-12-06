const express = require("express");
const router = express.Router();
const {signup, login } = require("../handlers/expertAuth");
const {createPatient, getPatient, editPatient, deletePatient} = require("../handlers/patients");

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

router
  .get("/:expert_id/patients", loginRequired, getPatient)
  .post("/:expert_id/patients",loginRequired, createPatient)
  // .put("/:expert_id/patients/:patient_id",loginRequired, ensureCorrectUser, editPatient)
  // .delete("/:expert_id/patients/:patient_id", loginRequired, ensureCorrectUser, deletePatient);




module.exports=router;