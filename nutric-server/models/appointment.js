const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema(
    {
        start: {
            type: Date,
            required: true,
        }, 
        duration: {
            type: Number,
            required: true,
        }, 
        status: {
            type: Boolean,
        }, 
        patientHistory:{
            personal:{
                sleepQuality: {
                    type: String,
                }, 
                physicalActivity: {
                    type: String,
                }, 
                smoker: {
                    type: Boolean,
                }, 
                alcoholConsumption: {
                    type: Boolean,
                }, 
            },
            goal:{
                goalType:{
                    type: String
                },
                goalDescription:{
                    type: String
                }
            },
            preferences: {
                like: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Meal"
                }],
                unlike: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Meal"
                }],
            },
            measurement: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Measurement"
            }
        },
        scheduleAppointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ScheduleAppointment"
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