const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanTemplateSchema = new mongoose.Schema(
    {
      mealPlanName: String,
      days:[{
        dayName: String,
        totalCalories: Number,
        totalProtein: Number,
        totalCarbs: Number,
        totalFat: Number,
        requiredWater: Number,
        meals:[{
          mealName: String,
          mealTime: String,
          recipes: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Food"
          }],
        }]
      }],
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Expert"
      },
    }, 
    {
        timestamps: true
    }
);
const MealPlanTemplate = mongoose.model("MealPlanTemplate", mealPlanTemplateSchema);

module.exports = MealPlanTemplate;