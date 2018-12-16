const database = require("../models");

exports.createScheduledAppointment = async function(req,res,next){
    try{
        let newScheduledAppointment = await database.Appointment.create({
            scheduledInfo:{
                wasScheduled:true,
                scheduledTimeStart: req.body.scheduledTimeStart,
                scheduledTimeEnd: req.body.scheduledTimeEnd,
                scheduledTimeDuration: req.body.scheduledTimeDuration,
                notes: req.body.notes
            },
            expert: req.params.expert_id,
            patient: req.body.patient_id 
            //RECORDAR: Cuando lleguemos al front, mandarlo como un hidden input. Colocar el nombre del paciente y actualizar
            //¡Llegue! Y no fue necesario mandarlo como hidden input (16-diciembre)
        });
        //Hacer referencia del scheduledAppointment en la BD del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.appointments.push(newScheduledAppointment._id);
        await foundExpert.save();
         //Hacer referencia del scheduledAppointment en la BD del paciente
        let foundPatient = await database.Patient.findById(req.body.patient_id);
        foundPatient.appointments.push(newScheduledAppointment._id);
        await foundPatient.save();
        
        return res.status(200).json(newScheduledAppointment);
    } catch(e){
        return next(e);
    }
};

exports.getScheduledAppointments = async function(req,res,next){
    try {
        let scheduledAppointments = await database.Appointment.find({expert:req.params.expert_id},'scheduledInfo patient').populate("patient", "firstName");
        return res.status(200).json(scheduledAppointments);
    } catch(error){
        return next(error);
    }
};

exports.deleteScheduledAppointment = async function(req,res,next){
    try{
        //Buscamomos la consulta agendada de la base de datoas ScheduledAppointment
        let foundScheduledAppointment = await database.Appointment.findById(req.params.scheduledAppointment_id);
        //Aqui se borra el scheduledAppointment del schema del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.appointments.splice(foundExpert.appointments.indexOf(req.params.scheduledAppointment_id),1);
        await foundExpert.save();
        //Aqui se borra el scheduledAppointment del schema del paciente        
        let foundPatient = await database.Patient.findById(foundScheduledAppointment.patient);
        foundPatient.appointments.splice(foundPatient.appointments.indexOf(req.params.scheduledAppointment_id),1);
        await foundPatient.save();
        //Finalmente, borramos la consulta agendada de la base de datos ScheduledAppointment
        let deleteScheduledAppointment = await database.Appointment.findByIdAndRemove(req.params.scheduledAppointment_id);

        return res.status(200).json("Removed succesfully");
    } catch(e){
        return next(e)
    }
}
exports.editScheduledAppointment = async function(req,res,next){
    try{
        let foundScheduledAppointment = await database.Appointment.findByIdAndUpdate(req.params.scheduledAppointment_id, {scheduledInfo:{
                scheduledTime: req.body.scheduledTime,
                scheduledDuration: req.body.scheduledDuration,
                notes: req.body.notes
            }}, {new:true});
        return res.status(200).json(foundScheduledAppointment);
    } catch(e){
        return next(e)
    }
}