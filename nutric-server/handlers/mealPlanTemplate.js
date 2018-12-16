const database = require("../models");

exports.createMealPlanTemplate = async function(req,res,next){
    try{
        let newMealPlanTemplate = await database.MealPlanTemplate.create({
          // req.body
        })
        
        
    } catch(e){
        return next(e);
    }
};