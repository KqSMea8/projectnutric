const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema(
    {
        direction: [{
            type: String
        }], 
        meal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }
    }, 
    {
        timestamps: true
    }
);


const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;