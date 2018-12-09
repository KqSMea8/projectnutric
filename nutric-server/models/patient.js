const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String, 
    mail: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    }, 
    password: String, 
    phone: String,
    country: String, 
    birthDate: Date,
    idType: String,
    idNumber: String,
    address: String,
    zipCode: String, 
    avatarUrl: String,
    favoriteFoods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }],
    dislikedFoods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal"
    }],
    allergies: [{ type: String }],
    smoker: Boolean, 
    alcoholConsumption: {
        type: Boolean,
        frequence: String,
        typeOfAlcohol: String
    },
    messagesEnabled: Boolean,
    appWasActivated: Boolean,
    appointmentConfirmation: Boolean,
    
    expert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert"
    },
    healthPlan:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthPlan"
    },
    mealPlan:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealPlan"
    }],
    measurement:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Measurement"
    }],
    appointment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    }],
    scheduledAppointment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScheduledAppointment"
    }],
  }, 
  {
    timestamps: true
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;