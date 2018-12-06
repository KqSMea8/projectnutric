const database = require("../models");

exports.createPatient = async function(req,res,next){
    try{
        let patient = await database.Patient.create({
          info:{
            firstName:req.body.firstName,
            mail:req.body.mail
          },
          expert:req.params.expert_id
        });
        console.log(patient)
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.patient.push(patient.id);
        await foundExpert.save();
        let foundPatient= await database.Patient.findById(patient._id).populate("Expert", {
            firstName: true,
          
        });
        return res.status(200).json(foundPatient);
    } catch(e){
        return next(e);
    }
};

exports.getPatient = async function(req,res,next){
    try {
        let patient = await database.Patient.find({expert : req.params.expert_id});
        return res.status(200).json(patient);
    } catch(error){
        return next(error);
    }
};

exports.deleteMessage = async function(req,res,next){
    try{
        let foundMessage = await database.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch(e){
        return next(e)
    }
}