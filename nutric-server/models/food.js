const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
	source: String,
	foodId: String,
	category: String,
	foodName: String,
	calories_kcal: Number,
	calories_kJ: Number,
	water_g: Number,
	protein_g: Number,
	fat_g: Number,
	carbs_g: Number,
	carbs_avl_g: Number,
	fiber_g: Number,
	ash_g: Number,
	calcium_mg: Number,
	phosphorus_mg: Number,
	zinc_mg: Number,
	iron_mg: Number,
	beta_carotene_ug: Number,
	vitaminA_ug: Number,
	thiamin_mg: Number,
	riboflavin_mg: Number,
	niacin_mg: Number,
	vitaminC_mg: Number,
	vitaminB9_ug: Number,
	sodium_mg: Number,
	potassium_mg: Number
}, { timestamps: true });

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;