const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthPlanSchema = new mongoose.Schema(
    {
        healthPlanName: {
            type: String,
            required: true,
        }, 
        description: {
            type: String,
            required: true,
        }, 
        price: {
            type: String,
            required: true,
        }, 
        frequency: {
            type: String,
            required: true,
        }, 
        expert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert"
        },
        patientEnrolled: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }]
    }, 
    {
        timestamps: true
    }
);

const HealthPlan = mongoose.model("HealthPlan", healthPlanSchema);

module.exports = HealthPlan;