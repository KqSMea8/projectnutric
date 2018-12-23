const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingPlanSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: false,
        }, 
        planDescription: {
            type: String,
            required: false,
        }, 
        planFrequency: {
            type: String,
            required: false,
        }, 
        price: {
            type: Number,
            required: false,
        }, 
        currency: {
            type: String,
            required: false,
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