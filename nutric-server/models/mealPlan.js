const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new mongoose.Schema(
    {
      mealPlanName: String,
      caloricGoal: Number,
      currentWeight: Number,
      currentBodyFat: Number,
      objective: String,
      endDate: Date, //para determinar paciente activo
      days:[{
        dayName: String,
        dailyCalories: Number,
        dailyProtein: Number,
        dailyCarbs: Number,
        dailyFat: Number,
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
        ref: "Patient",
        required: true
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