const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new mongoose.Schema(
    {
        income: {
            type: Number,
            required: true,
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


const Stat = mongoose.model("Stat", statSchema);
module.exports = Stat;