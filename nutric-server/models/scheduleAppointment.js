const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleAppointmentSchema = new mongoose.Schema(
    {
        start: {
            type: Date,
            required: true,
        }, 
        status: {
            type: Boolean,
            required: true,
        }, 
        notes: {
            type: String,
            required: true,
        }, 
        workplace: {
            type: String,
            required: true,
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

const ScheduleAppointment = mongoose.model("ScheduleAppointment", scheduleAppointmentSchema);

module.exports = ScheduleAppointment;