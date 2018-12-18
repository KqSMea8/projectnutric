const database = require("../models");

// importate usar let dentro de las estas funciones para mantener el scope.

exports.createPatient = async function(req,res,next){
    try{
        let newPatient = await database.Patient.create({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            mail:req.body.mail,
            expert:req.params.expert_id
        })
        
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.patients.push(newPatient._id);
        await foundExpert.save();
        
        let foundPatient= await database.Patient.findById(newPatient._id).populate("expert","firstName");
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e);
    }
};

exports.getPatients = async function(req,res,next){
    try {
        let foundPatient = await database.Patient.find({expert:req.params.expert_id}).populate("mealPlans","endDate");
        return res.status(200).json(foundPatient);
    } catch(error){
        return next(error);
    }
};


exports.deletePatient = async function(req,res,next){
    try{
        let foundPatient = await database.Patient.findByIdAndRemove(req.params.patient_id);
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.patients.splice(foundExpert.patients.indexOf(req.params.patient_id),1);
        await foundExpert.save();
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e)
    }
}

// por ahora este edit esta estructurado para tener un solo form en el front (solo hay 1 req.body)
// agregar layer de if(foundPatient.expert == req.params.patient_id)
exports.editPatient = async function(req,res,next){
    try{
        let foundPatient = await database.Patient.findByIdAndUpdate(req.params.patient_id, req.body, { new: true }); 
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e);
    }
};

exports.getOnePatient = async function(req, res, next){
   try{
    let foundPatient = await database.Patient.findById(req.params.patient_id).populate("expert","firstName");
    return res.status(200).json(foundPatient);
   }  
   catch(e){
      return next(e);
   }
};