const mongoose  = require('mongoose');

//Set-up mongoose
mongoose.set('debug', true);
mongoose.Promise = Promise;

//Connect to mLab
mongoose.connect("mongodb://nutricdb:projectnultron1@ds225624.mlab.com:25624/nutricdb",{
    useNewUrlParser: true
})
  .then(() => console.log("MongoDB (mLab) Connected"))
  .catch(err => console.log(err));

module.exports.Appointment = require("./appointment");
module.exports.Expert = require("./expert");
module.exports.BillingPlan = require("./billingPlan");
module.exports.Food = require("./food");
module.exports.HealthPlan = require("./healthPlan");
module.exports.MealPlan = require("./mealPlan");
module.exports.MealPlanTemplate = require("./mealPlanTemplate");
module.exports.Patient = require("./patient");
module.exports.Recipe = require("./recipe");
module.exports.Stat = require("./stat");

