const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema(
    {
        info:{
            firstName: {
                type: String,
                required: true,
            },
            mail: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: false,
            }, 
            password: {
                type: String,
            }, 
            phone: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                required: false,
            }, 
            gender: {
                type: String,
                required: false,
            }, 
            birthDate: {
                type: Date,
            }, 
            idType: {
                type: String,
            }, 
            idNumber: {
                type: String,
            }, 
            address: {
                type: String,
            }, 
            zipCode: {
                type: String,
            }, 
            avatar: {
                type: String,
            }
        },
        preference: {
            favorites: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meal"
            }],
            dislike: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meal"
            }],
            allergies: {
              
            },
            messages: {
                type: Boolean
            },
            app: {
                type: Boolean
            },
            appointmentConfirmation: {
                type: Boolean
            }
        },
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
        timestamps: false
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;