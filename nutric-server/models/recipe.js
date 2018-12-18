const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
  
  mealPlans: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'MealPlan'
  }],
  description: String,
  categoria: String,
  recipeName: String,
  instructions: [{
    type: String
  }],
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  expert:{
  type:mongoose.Schema.Types.ObjectId,
  ref: "Expert"
      },
},
    {
    timestamps: true
  }
);


const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;