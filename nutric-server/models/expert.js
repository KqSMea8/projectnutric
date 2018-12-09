const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// cambiar todos los arrays a plural
const expertSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        }, 
        lastName: {
            type: String,
            required: false,
        }, 
        password: {
            type: String,
            required: true,
        }, 
        phone: {
            type: String,
            required: false,
        }, 
        mail: {
            type: String,
            required: true,
            unique: true
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
            required: false,
        }, 
        billingPlan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BillingPlan"
        }, 
        patient: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }],
        scheduledAppointment: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "scheduledAppointment"
        }],
        appointment: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }],
        mealPlan: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "MealPlan"
        }],
        healthPlan: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthPlan"
        }]
    },
    {
        timestamps: true
    }
);

expertSchema.pre("save", async function(next){
    
    try {
      if(!this.isModified("password")){
        return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    return next();
    } 
    
    catch(err) {
      return next(err);
    }
});

expertSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err){
        return next(err);
    }
};



const Expert = mongoose.model("Expert", expertSchema);
module.exports = Expert;