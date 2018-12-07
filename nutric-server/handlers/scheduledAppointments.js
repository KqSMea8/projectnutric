const database = require("../models");

exports.ScheduleNewAppointment = async function(req,res,next){
    try{
        let newAppointment = await database.ScheduledAppointment.create({
          starts :req.body.starts,
          duration:req.body.duration,
          expert:req.params.expert_id,
          patient:req.body.patient_id //RECORDAR: Cuando lleguemos al front, mandarlo como un hidden input. Colocar el nombre del paciente y actualizar
        });
        //Hacer referencia del scheduledAppointment en la BD del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.scheduledAppointment.push(newAppointment._id);
        await foundExpert.save();
         //Hacer referencia del scheduledAppointment en la BD del paciente
        let foundPatient = await database.Patient.findById(req.body.patient_id);
        foundPatient.scheduledAppointment.push(newAppointment._id);
        await foundPatient.save();
        
        let foundAppointment= await database.ScheduledAppointment.findById(newAppointment._id).populate("Expert", {
            firstName: true,
          
        });
        return res.status(200).json(foundAppointment);
    } catch(e){
        return next(e);
    }
};

exports.getScheduledAppointments = async function(req,res,next){
    try {
        let appointments = await database.ScheduledAppointment.find({expert:req.params.expert_id});
        return res.status(200).json(appointments);
    } catch(error){
        return next(error);
    }
};

exports.deleteScheduledAppointment = async function(req,res,next){
    try{
        //Buscamomos la consulta agendada de la base de datoas ScheduledAppointment
        let foundScheduledAppointment = await database.ScheduledAppointment.findById(req.params.scheduledAppointment_id);
        //Aqui se borra el scheduledAppointment del schema del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.scheduledAppointment.splice(foundExpert.scheduledAppointment.indexOf(req.params.scheduledAppointment_id),1);
        await foundExpert.save();
        //Aqui se borra el scheduledAppointment del schema del paciente        
        let foundPatient = await database.Patient.findById(foundScheduledAppointment.patient);
        foundPatient.scheduledAppointment.splice(foundPatient.scheduledAppointment.indexOf(req.params.scheduledAppointment_id),1);
        await foundPatient.save();
        //Finalmente, borramos la consulta agendada de la base de datos ScheduledAppointment
        let deleteScheduledAppointment = await database.ScheduledAppointment.findByIdAndRemove(req.params.scheduledAppointment_id);

        return res.status(200).json("Removed succesfully");
    } catch(e){
        return next(e)
    }
}
exports.editScheduledAppointment = async function(req,res,next){
    try{
        // ojo al req que sea info.firstName
        let foundScheduledAppointment = await database.ScheduledAppointment.findByIdAndUpdate(req.params.scheduledAppointment_id, req.body, {new:true});
        return res.status(200).json(foundScheduledAppointment);
    } catch(e){
        return next(e)
    }
}