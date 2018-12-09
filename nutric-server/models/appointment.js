const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// se crea en el momento que se pone el boton de consulta del sidebar, o "Empezar consulta" en la agenda
const appointmentSchema = new mongoose.Schema(
    {
      startTime: Date,
      duration: Number,
      // en caso no tengamos el model de scheduledAppointment
      scheduledInfo: {
        wasScheduled: {
          type: Boolean,
          default: false
        },
        scheduledTime: Date,
        scheduledDuration: Number,
        notes: String
      },
      patientInfo:{
        sleepQuality: String, 
        physicalActivity: String, 
        goal:{
          goalType: String,
          goalDescription: String
        },
        measurement: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Measurement"
        },
        mealPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MealPlan"
        }
      },
      // en caso si tengamos schema de scheduledAppointment
      scheduledAppointment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "scheduledAppointment"
      },
      patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient"
      },
      expert: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Expert"
      }
  }, 
  {
      timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;