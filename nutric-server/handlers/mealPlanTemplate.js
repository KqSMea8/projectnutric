const database = require("../models");

// ok
exports.createMealPlanTemplate = async function(req,res,next){
  try {
    let newMealPlanTemplate = await database.MealPlanTemplate.create({
      mealPlanTemplateName: req.body.mealPlanTemplateName,
      expert:               req.params.expert_id,
      objective:            req.body.objective,
      avgDailyCalories:     req.body.avgDailyCalories,
      avgDailyProtein:      req.body.avgDailyProtein,
      avgDailyCarbs:        req.body.avgDailyCarbs,
      avgDailyFat:          req.body.avgDailyFat,
      // image:                req.body.image
    });
    newMealPlanTemplate.save();
      
    let foundExpert = await database.Expert.findById(req.params.expert_id);
    foundExpert.mealPlanTemplates.push(newMealPlanTemplate._id);
    await foundExpert.save();
    return res.status(200).json(newMealPlanTemplate);
    
  } catch(e){
      return next(e);
  }
};

// ok
exports.getMealPlanTemplates = async function(req, res, next){
  try{
    let foundMealPlanTemplates = await database.MealPlanTemplate.find({expert: req.params.expert_id});
    return res.status(200).json(foundMealPlanTemplates);
    
  } catch(e){
    return next(e);
  }
};

// ok
exports.getOneMealPlanTemplate = async function(req, res, next){
  try{
    let foundMealPlanPlanTemplates = await database.MealPlanTemplate.findById(req.params.mealPlanTemplate_id);
    return res.status(201).json(foundMealPlanPlanTemplates);
  } catch(e){
    return next(e)
  }
}

// ok
exports.editMealPlanTemplate = async function(req,res,next){
    try{
        let foundMealPlanTemplate = await database.MealPlanTemplate.findByIdAndUpdate(req.params.mealPlanTemplate_id, req.body, { new: true });
        // extra layer
        if(foundMealPlanTemplate.expert == req.params.expert_id){
          return res.status(200).json(foundMealPlanTemplate);
        } else {
          return 'You are not allowed to do this'
        }
    } catch(e){
        return next(e);
    }
};

// ok
exports.deleteMealPlanTemplate = async function(req, res, next){
  try{
    let foundMealPlanTemplate = await database.MealPlanTemplate.findByIdAndRemove(req.params.mealPlanTemplate_id);
    let foundExpert = await database.Expert.findById(req.params.expert_id);
    foundExpert.mealPlanTemplates.splice(foundExpert.mealPlanTemplates.indexOf(req.params.mealPlanTemplate_id),1);
    foundExpert.save();
    
    return res.status(200).json(foundMealPlanTemplate);
  } catch(e){
    next(e);
  }
}