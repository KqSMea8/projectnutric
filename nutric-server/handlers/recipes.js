const database = require("../models");

exports.getRecipes = async function(req,res,next){ 
   try {
        let foundRecipe = await database.Recipe.find().populate("experts");
        return res.status(200).json(foundRecipe);
    } catch(error){
        return next(error);
    }
};

exports.createRecipe = async function(req,res,next){
    try{
        let newRecipe = await database.Recipe.create({
            recipeName: req.body.recipeName,
            description: req.body.description,
            ingredients: req.body.ingredients,
            expert:req.params.expert_id
             
        })
        return res.status(200).json(newRecipe);
    } catch(e){
        return next(e);
    }
};
