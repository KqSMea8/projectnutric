const database = require("../models");

// Poner aqui las acciones (funciones) relacionadas a los mealPlans:
// 1. Crear Meal Plan
// 2. Editar Meal Plan. Ocurre cada vez que se agrega un Food, un meal, o un dia.
// 3. Eliminar Meal Plan
// 4. Buscar Food (en agregar alimento del front)
// 5. Getear Meal Plans para los pendientes

exports.createMealPlan = async function(req, res, next){
  try {
      //Con el supuesto de que la creas aparte de un appointment
    let newMealPlan = await database.MealPlan.create({
      // INPUTOS
      mealPlanName:     req.body.mealPlanName,
      objective:        req.body.objective,
      avgDailyCalories: req.body.avgDailyCalories,
      avgDailyProtein:  req.body.avgDailyProtein,
      avgDailyCarbs:    req.body.avgDailyCarbs,
      avgDailyFat:      req.body.avgDailyFat,
      endDate:          req.body.endDate,
      progress:         req.body.progress,
      days:             req.body.days,
      
      // REFERENCES
      expert:           req.params.expert_id,
      patient:          req.params.patient_id,
      appointment:      req.body.appointment
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
    return next(e);
  }
};

exports.getMealPlans = async function(req, res, next){
  try{
    let foundMealPlans = await database.MealPlan.find({expert: req.params.expert_id}).populate('patient', 'firstName lastName');
    return res.status(200).json(foundMealPlans);
    
  } catch(e){
    return next(e);
  }
};

exports.editDay = async function(req, res, next){
    
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






