const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const measurementSchema = new mongoose.Schema(
    {
        anthropometric: {
			weight: {
				type: Number
			},
			height:{
				type: Number
			},
			skinFold:{
				abdominal:{
					type: Number
				},
				bicep:{
					type: Number
				},
				chest:{
					type: Number
				},
				frontThigh:{
					type: Number
				},
				iliacCrest:{
					type: Number
				},
				medialCalf:{
					type: Number
				},
				midaxillary:{
					type: Number
				},
				subscapular:{
					type: Number
				},
				suprailiac:{
					type: Number
				},
				supraspinale:{
					type: Number
				},
				tricep:{
					type: Number
				}
			},
			circumference:{
				abdominal:{
					type: Number
				},
				ankle:{
					type: Number
				},
				armFlexed:{
					type: Number
				},
				armRelaxed:{
					type: Number
				},
				armRelaxed:{
					type: Number
				},
				calf:{
					type: Number
				},
				chest:{
					type: Number
				},
				forearm:{
					type: Number
				},
				hip:{
					type: Number
				},
				midThigh:{
					type: Number
				},
				neck:{
					type: Number
				},
				shoulder:{
					type: Number
				},
				thigh:{
					type: Number
				},
				waist:{
					type: Number
				},
				wrist: {
					type: Number
				}
			},
			breadth:{
				ankle:{
					type: Number
				},
				elbow:{
					type: Number
				},
				femur:{
					type: Number
				},
				wrist:{
					type: Number
				}
			}

		},
		analytical:{
			bloodPressure:{
				type: Number
			},
			cholesterol:{
				type: Number
			}
		},
		bodyComposition:{
			bodyFat:{
				type: Number
			},
			fatMass:{
				type: Number
			},
			muscleMass:{
				type: Number
			},
			muscleMassPercentage:{
				type: Number
			}
		},
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
		},
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
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


const Measurement = mongoose.model("Measurement", measurementSchema);

module.exports = Measurement;