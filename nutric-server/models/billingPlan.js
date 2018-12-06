const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingPlanSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: true,
        }, 
        planDescription: {
            type: String,
            required: true,
        }, 
        planFrequency: {
            type: String,
            required: true,
        }, 
        price: {
            type: String,
            required: true,
        }, 
        currency: {
            type: String,
            required: true,
        }, 
        expert: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert"
        }]
    }, 
    {
        timestamps: true
    }
);

const BillingPlan = mongoose.model("BillingPlan", billingPlanSchema);

module.exports = BillingPlan;