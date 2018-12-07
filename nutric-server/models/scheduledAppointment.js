const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduledAppointmentSchema = new mongoose.Schema(
    {
        starts: {
            type: Date,
            required: true,
        }, 
        duration: {
            type: Number,
            required: false,
        },
        status: {
            type: Boolean,
            required: false,
        }, 
        notes: {
            type: String,
            required: false,
        }, 
        workplace: {
            type: String,
            required: false,
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

const ScheduledAppointment = mongoose.model("scheduledAppointment", scheduledAppointmentSchema);

module.exports = ScheduledAppointment;