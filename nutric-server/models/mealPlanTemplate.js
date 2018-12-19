const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanTemplateSchema = new mongoose.Schema(
    {
      mealPlanTemplateName: { //poner en input maxValue para evitar distorciones si hay muchos caracteres
       type: String,
       required: true
      },
      // image: String,
      objective: String,
      avgDailyCalories: Number,
      avgDailyProtein: Number,
      avgDailyCarbs: Number,
      avgDailyFat: Number,
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
      expert:{
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