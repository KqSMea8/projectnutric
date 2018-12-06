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

module.exports.Patient = require("./appointment");
module.exports.Expert = require("./expert");
module.exports.BillingPlan = require("./billingPlan");
module.exports.Food = require("./food");
module.exports.HealthPlan = require("./healthPlan");
module.exports.Meal = require("./meal");
module.exports.MealPlan = require("./mealPlan");
module.exports.Measurement = require("./measurement");
module.exports.Patient = require("./patient");
module.exports.Recipe = require("./recipe");
module.exports.ScheduleAppointment = require("./scheduleAppointment");
module.exports.Stat = require("./stat");

