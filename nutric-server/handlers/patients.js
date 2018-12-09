const database = require("../models");

// importate usar let dentro de las estas funciones para mantener el scope.

exports.createPatient = async function(req,res,next){
    try{
        let patient = await database.Patient.create({
          info:{
            firstName:req.body.firstName,
            mail:req.body.mail
          },
          expert:req.params.expert_id
        });
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        // cambiar patient a patients porque es un array
        foundExpert.patient.push(patient._id);
        await foundExpert.save();
        let foundPatient= await database.Patient.findById(patient._id).populate("Expert", {
            firstName: true,
          
        });
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e);
    }
};

exports.getPatients = async function(req,res,next){
    try {
        let patient = await database.Patient.find({expert:req.params.expert_id});
        return res.status(200).json(patient);
    } catch(error){
        return next(error);
    }
};

// borrar appointments del paciente de la bd de appointments. 
// Hacer ese proceso para todas los schemas relacionados a pacientes.
exports.deletePatient = async function(req,res,next){
    try{
        let foundPatient = await database.Patient.findByIdAndRemove(req.params.patient_id); //findByIdAndRemove dicen que trae errores
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.patient.splice(foundExpert.patient.indexOf(req.params.patient_id),1);
        await foundExpert.save();
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e)
    }
}

// por ahora este edit esta estructurado para tener un solo form en el front (solo hay 1 req.body)
exports.editPatient = async function(req,res,next){
    try{
        // ojo al req que sea info.firstName, deberiamos cambiarlo
        let foundPatient = await database.Patient.findByIdAndUpdate(req.params.patient_id, req.body, { new: true }); 
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e);
    }
};

exports.getOnePatient = async function(req, res, next){
   try{
    let foundPatient = await database.Patient.findById(req.params.patient_id);
    return res.status(200).json(foundPatient);
   }  
   catch(e){
      return next(e);
   }
};