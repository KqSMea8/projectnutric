const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new mongoose.Schema(
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
      patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Patient"
      },
      appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
      }
    }, 
    {
        timestamps: true
    }
);
const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;