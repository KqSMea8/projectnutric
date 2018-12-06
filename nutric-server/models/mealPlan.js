const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new mongoose.Schema(
    {
        meal: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }],
        asignedTo:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert"
        }
    }, 
    {
        timestamps: true
    }
);


const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;