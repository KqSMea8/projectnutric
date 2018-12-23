const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
    age: Number, //calculado automaticamente en el front cuando da su fecha de nacimiento
    idType: String,
    idNumber: String,
    address: String,
    zipCode: String, 
    avatarUrl: String,
    isActive: Boolean, //en caso tenga un meal plan en este momento, isActive es true
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
    mealPlans:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealPlan"
    }],
    measurements:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Measurement"
    }],
    appointments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    }],
  }, 
  {
    timestamps: true
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;