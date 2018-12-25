const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// se crea en el momento que se pone el boton de consulta del sidebar, o "Empezar consulta" en la agenda
const appointmentSchema = new mongoose.Schema(
    {
      realStartTime: Date,
      realDuration: Number,
      realTimeEnd: Date,
      reason: String,
      scheduledInfo: {
        wasScheduled: { //no es un input
          type: Boolean,
          default: false
        },
        scheduledStartTime: Date,
        scheduledDuration:Number,
        scheduledTimeEnd: Date,
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
          anthropometric: {
      		  weight: Number,
      			height: Number, 
      			skinFold:{
      				abdominal: Number,
      				bicep: Number,
      				chest: Number,
      				frontThigh: Number,
      				iliacCrest: Number,
      				medialCalf: Number,
      				midaxillary: Number,
      				subscapular: Number,
      				suprailiac: Number,
      				supraspinale: Number,
      				tricep: Number
      			},
      			circumference:{
      				abdominal: Number,
      				ankle: Number,
      				armFlexed: Number,
      				armRelaxed: Number,
      				calf: Number,
      				chest: Number,
      				forearm: Number,
      				hip: Number,
      				midThigh: Number,
      				neck: Number,
      				shoulder: Number,
      				thigh: Number,
      				waist: Number,
      				wrist: Number
      			},
      			breadth:{
      				ankle:Number,
      				elbow: Number,
      				femur: Number,
      				wrist: Number
      			}
      		},
      		analytical:{
      			bloodPressure: Number,
      			cholesterol: Number
      		},
      		bodyComposition:{
      			bodyFat: Number,
      			fatMass: Number,
      			muscleMass: Number,
      			muscleMassPercentage: Number,
      			boneMass: Number,
      			bodyWater: Number,
		      }
        },
        mealPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MealPlan"
        }
      },
      patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient",
          required:true
      },
      expert: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Expert",
          required:true
      }
  }, 
  {
      timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;