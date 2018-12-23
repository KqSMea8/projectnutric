const database = require("../models");

exports.getBillingPlans = async function(req,res,next){ 
   try {
        let foundPlan = await database.BillingPlan.find().populate("experts");
        return res.status(200).json(foundPlan);
    } catch(error){
        return next(error);
    }
};

exports.createBillingPlan = async function(req,res,next){
    try{
        let newPlan = await database.BillingPlan.create({
            planName: req.body.planName,
            price: req.body.price,
            planDescription: req.body.planDescription,
             
        })
        return res.status(200).json(newPlan);
    } catch(e){
        return next(e);
    }
};
