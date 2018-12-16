const database = require("../models");

// Poner aqui las acciones (funciones) relacionadas a los mealPlans:
// 1. Crear Meal Plan
// 2. Editar Meal Plan. Ocurre cada vez que se agrega un Food, un meal, o un dia.
// 3. Eliminar Meal Plan
// 4. Buscar Food (en agregar alimento del front)
// 5. 

exports.createMealPlan = async function(req, res, next){
  try {
      //Con el supuesto de que la creas aparte de un appointment
    let newMealPlan = await database.MealPlan.create({
      // DATA DEL POPUP
      // dailyCalories: req.body.dailyCalories,
      patient: req.params.patient_id,
      // currentWeight: req.body.currentWeight,
      // currentBodyFat: req.body.currentBodyFat,
      // objective: req.body.objective,
      // createdBy: req.params.expert_id
      endDate: req.body.endDate,
      mealPlanName: req.body.mealPlanName
      
    });
    newMealPlan.save();

    let foundExpert = await database.Expert.findById(req.params.expert_id)
    foundExpert.mealPlans.push(newMealPlan._id);
    await foundExpert.save();
    
    let foundPatient = await database.Patient.findById(req.params.patient_id)  //id del paciente tendria que estar en hidden input? puede sacarse de mongo?
    foundPatient.mealPlans.push(newMealPlan._id);
    await foundPatient.save();
        
    return res.status(200).json(newMealPlan);
  }
  catch(e){
    next(e);
  }
};

exports.editDay = async function(req, res, next){
    
};

exports.findFoods = async function(req,res,next){ //te aparece el cuadrito con las cuatro primeras comidas que buscas
//En index.js había puesto esto. Solo faltaría cambiar la respuesta (calories_kcal, protein_g, etc)
    if(req.query.foundFood.length>=3){
      try {
          let foundFood = await database.Food.find({
        foodName_lowercase: {
          $regex:new RegExp(req.query.foundFood.toLowerCase())
        }
      }).limit(20);
          //aqui falta agregar el limit (4 o 5)
          return res.status(200).json(foundFood)
          // return res.status(200).json(`Name: $dv{foundFood[0].foodName}, Calories: ${foundFood.calories_kcal}, Protein: ${foundFood.protein_g}, Fat: ${foundFood.fat_g}, Carbs: ${foundFood.carbs_g} `);
      } catch(error){
          return next(error);
      }
    } else {
      return res.status(200).json("")
    }
};


/// Sabemos que en la accion de "onClick" se pushea el food clickeado a un objeto, luego este objeto automaticamente es pusheado al modelo de 
//  meal plan de ese mismo plan. El problema actualmente es identificar a que objeto se pushea el meal que seleccionas 
exports.saveMeal = async function(req,res,next){
    try{
        // llamar a los id's de los forms del front igual que las propiedades en el back
        let foundMealPlan = await database.MealPlan.findByIdAndUpdate(req.params.MealPlan_id, { mealPlanName: req.body.mealPlanName }, { new: true }); 
        foundMealPlan.save();
        return res.status(200).json(foundMealPlan);
    } catch(e){
        return next(e);
    }
};






