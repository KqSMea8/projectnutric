const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
  foodName: String,
  instructions: [{
    type: String
  }],
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }]
});


const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;