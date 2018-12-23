const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new mongoose.Schema(
    {
      mealPlanName: {
        type: String,
        required: true
      },
      objective: String,
      avgDailyCalories: Number,
      avgDailyProtein: Number,
      avgDailyCarbs: Number,
      avgDailyFat: Number,
      endDate: {
        type: Date, 
        required: true
      }, //para determinar paciente activo
      progress: Number, //en %, para determinar pending mealPlan
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
      expert:{
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