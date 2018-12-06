const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new mongoose.Schema(
    {
        mealName: {
            type: String,
            required: true,
        }, 
        recipe: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }],
        food: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }]
    }, 
    {
        timestamps: true
    }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;