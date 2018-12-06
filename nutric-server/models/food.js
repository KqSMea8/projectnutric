const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
	accurate_grams: {
		type: Boolean
	},
	allow_public: {
		type: Boolean
	},
	average_frequency: {
		type: Number
	},
	blatantly_unhealthy: {
		type: Boolean
	},
	breakfast: {
		type: Boolean
	},
	can_be_bulk: {
		type: 'Mixed'
	},
	category_id: {
		type: 'Mixed'
	},
	complexity: {
		type: Number
	},
	cook_time: {
		type: Number
	},
	curated: {
		type: Boolean
	},
	curated_date: {
		type: 'Mixed'
	},
	default_frequency: {
		type: Number
	},
	default_package_amount: {
		type: Number
	},
	default_package_units: {
		type: Number
	},
	default_units: {
		type: Number
	},
	deleted: {
		type: Boolean
	},
	description: {
		type: String
	},
	discrete_units: {
		type: Number
	},
	expiration_time: {
		type: Number
	},
	extra_tags: {
		type: String
	},
	food_group: {
		type: Number
	},
	food_group_id: {
		type: Number
	},
	food_name: {
		type: String
	},
	food_rating: {
		type: 'Mixed'
	},
	id: {
		type: Number
	},
	images: {
		type: String
	},
	info_id: {
		type: Number
	},
	is_basic_food: {
		type: Boolean
	},
	is_discrete: {
		type: Boolean
	},
	is_recipe: {
		type: Boolean
	},
	is_snack: {
		type: Boolean
	},
	keeps_well: {
		type: 'Mixed'
	},
	main_dish: {
		type: Boolean
	},
	major_ingredients: {
		type: String
	},
	mapped_meal_tags: {
		type: Date
	},
	max_servings: {
		type: Number
	},
	meal_tags: {
		type: Date
	},
	meta_tags: {
		type: String
	},
	minimum_discrete_amount: {
		type: Number
	},
	missing_prices: {
		type: 'Mixed'
	},
	model: {
		type: String
	},
	needs_blender: {
		type: 'Mixed'
	},
	needs_food_processor: {
		type: 'Mixed'
	},
	needs_grill: {
		type: 'Mixed'
	},
	needs_microwave: {
		type: 'Mixed'
	},
	needs_oven: {
		type: 'Mixed'
	},
	needs_slow_cooker: {
		type: 'Mixed'
	},
	needs_stove: {
		type: 'Mixed'
	},
	needs_toaster: {
		type: 'Mixed'
	},
	num_favorites: {
		type: Number
	},
	num_frequency_adjustments: {
		type: Number
	},
	num_ingredient_usages: {
		type: Number
	},
	num_normalized_ingredient_usages: {
		type: Number
	},
	num_ratings: {
		type: Number
	},
	num_reviews: {
		type: Number
	},
	number_of_ingredients: {
		type: Number
	},
	number_servings: {
		type: Number
	},
	nutrition: {
		ala_fatty_acid: {
			type: Number
		},
		alanine: {
			type: Number
		},
		alcohol: {
			type: Number
		},
		alpha_carotene: {
			type: Number
		},
		arginine: {
			type: Number
		},
		aspartic_acid: {
			type: Number
		},
		beta_carotene: {
			type: Number
		},
		betaine: {
			type: Number
		},
		caffeine: {
			type: Number
		},
		calcium: {
			type: Number
		},
		calories: {
			type: Number
		},
		carbs: {
			type: Number
		},
		cholesterol: {
			type: Number
		},
		choline: {
			type: Number
		},
		copper: {
			type: Number
		},
		cystine: {
			type: Number
		},
		dha_fatty_acid: {
			type: Number
		},
		dpa_fatty_acid: {
			type: Number
		},
		epa_fatty_acid: {
			type: Number
		},
		fats: {
			type: Number
		},
		fiber: {
			type: Number
		},
		fluoride: {
			type: Number
		},
		folate: {
			type: Number
		},
		food_group: {
			type: Number
		},
		food_group_id: {
			type: Number
		},
		fructose: {
			type: 'Mixed'
		},
		fruit_servings: {
			type: Number
		},
		galactose: {
			type: 'Mixed'
		},
		glucose: {
			type: 'Mixed'
		},
		glutamic_acid: {
			type: Number
		},
		glycine: {
			type: Number
		},
		histidine: {
			type: Number
		},
		hydroxyproline: {
			type: 'Mixed'
		},
		iron: {
			type: Number
		},
		isoleucine: {
			type: Number
		},
		lactose: {
			type: 'Mixed'
		},
		leucine: {
			type: Number
		},
		lycopene: {
			type: Number
		},
		lysine: {
			type: Number
		},
		magnesium: {
			type: Number
		},
		maltose: {
			type: 'Mixed'
		},
		manganese: {
			type: Number
		},
		methionine: {
			type: Number
		},
		monounsaturated_fats: {
			type: Number
		},
		niacin: {
			type: Number
		},
		pantothenic_acid: {
			type: Number
		},
		phenylalanine: {
			type: Number
		},
		phosphorus: {
			type: Number
		},
		polyunsaturated_fats: {
			type: Number
		},
		potassium: {
			type: Number
		},
		price: {
			type: Number
		},
		proline: {
			type: Number
		},
		proteins: {
			type: Number
		},
		retinol: {
			type: Number
		},
		riboflavin: {
			type: Number
		},
		saturated_fats: {
			type: Number
		},
		selenium: {
			type: Number
		},
		serine: {
			type: Number
		},
		sodium: {
			type: Number
		},
		starch: {
			type: 'Mixed'
		},
		sucrose: {
			type: 'Mixed'
		},
		sugar: {
			type: Number
		},
		theobromine: {
			type: Number
		},
		thiamine: {
			type: Number
		},
		threonine: {
			type: Number
		},
		total_omega_3: {
			type: Number
		},
		total_omega_6: {
			type: Number
		},
		trans_fats: {
			type: Number
		},
		tryptophan: {
			type: Number
		},
		tyrosine: {
			type: Number
		},
		valine: {
			type: Number
		},
		veggie_servings: {
			type: Number
		},
		vit_a: {
			type: Number
		},
		vit_a_iu: {
			type: Number
		},
		vit_b12: {
			type: Number
		},
		vit_b6: {
			type: Number
		},
		vit_c: {
			type: Number
		},
		vit_d: {
			type: Number
		},
		vit_d2: {
			type: 'Mixed'
		},
		vit_d3: {
			type: Number
		},
		vit_d_iu: {
			type: Number
		},
		vit_e: {
			type: Number
		},
		vit_k: {
			type: Number
		},
		water: {
			type: Number
		},
		zinc: {
			type: Number
		}
	},
	perishable: {
		type: Boolean
	},
	prep_day_before: {
		type: Boolean
	},
	prep_time: {
		type: Number
	},
	resource_uri: {
		type: String
	},
	score: {
		type: Number
	},
	serving_calories: {
		type: Number
	},
	serving_carbs: {
		type: Number
	},
	serving_fats: {
		type: Number
	},
	serving_price: {
		type: Number
	},
	serving_proteins: {
		type: Number
	},
	side_dish: {
		type: Boolean
	},
	single_serving: {
		type: Boolean
	},
	slug: {
		type: Date
	},
	source: {
		type: String
	},
	substitution_tags: {
		type: String
	},
	tag_cloud: {
		type: String
	},
	total_ingredient_usages: {
		type: Number
	},
	total_time: {
		type: Number
	},
	user_id: {
		type: 'Mixed'
	},
	wait_time: {
		type: Number
	},
	weights: {
		type: [
			'Mixed'
		]
	}
}, { timestamps: true });

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;