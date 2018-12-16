// Este file solo sirve si tenemos el schema de scheduledAppointment

// falta cambiar de Appointment a appointment
const database = require("../models");

exports.createAppointment = async function(req,res,next){
    try{
        let newAppointment = await database.Appointment.create({
          expert: req.params.expert_id,
          patient: req.body.patient_id //RECORDAR: Cuando lleguemos al front, mandarlo como un hidden input. Colocar el nombre del paciente y actualizar
        });
        
        //Hacer referencia del Appointment en la BD del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.appointment.push(newAppointment._id);
        await foundExpert.save();
    
        //Hacer referencia del Appointment en la BD del paciente
        let foundPatient = await database.Patient.findById(req.body.patient_id)
        
        // aqui hay dos opciones: 1. cuando se crea el appointment, borrar el scheduledappointment asociado a ese appointment nuevo. (para ahorrar bd)
        //2. no borrarlo para poder comparar scheduledappointment.length vs appointment.length y se sale el % de cancelacion de ese paciente.
        await foundPatient.save();
        
        //Cambiar el boolean en ScheduledAppointment (hasStarted) de false a true
        let foundScheduledAppointment = await database.ScheduledAppointment.findById(foundPatient.scheduledAppointment[foundPatient.scheduledAppointment.length-1])
        foundScheduledAppointment.hasStarted = true;
        await foundScheduledAppointment.save()
        
        //Hacer referencia del ScheduledAppointment en la BD del Appointment
        let foundNewAppointment = await database.Appointment.findByIdAndUpdate(newAppointment._id,{"scheduledAppointment": foundScheduledAppointment._id},{new:true})
        await foundNewAppointment.save()
        
        return res.status(200).json(foundNewAppointment);
    } catch(e){
        return next(e);
    }
};

exports.getAppointments = async function(req,res,next){
    try {
        let appointments = await database.Appointment.find({expert:req.params.expert_id},'duration');
        return res.status(200).json(appointments);
    } catch(error){
        return next(error);
    }
};

// es necesario poder borrar la consulta?
exports.deleteAppointment = async function(req,res,next){
    try{
        //Buscamos la consulta realizada de la base de datos Appointment
        let foundAppointment = await database.Appointment.findById(req.params.appointment_id);
        //Aqui se borra el Appointment del schema del experto
        let foundExpert = await database.Expert.findById(req.params.expert_id);
        foundExpert.appointment.splice(foundExpert.appointment.indexOf(req.params.appointment_id),1);
        await foundExpert.save();
        //Aqui se borra el Appointment del schema del paciente        
        let foundPatient = await database.Patient.findById(foundAppointment.patient);
        foundPatient.appointment.splice(foundPatient.appointment.indexOf(req.params.appointment_id),1);
        await foundPatient.save();
        //Finalmente, borramos la consulta agendada de la base de datos Appointment
        let deleteAppointment = await database.Appointment.findByIdAndRemove(req.params.appointment_id);

        return res.status(200).json("Removed succesfully");
    } catch(e){
        return next(e)
    }
}
exports.editAppointment = async function(req,res,next){
    try{
        // ojo al req que sea info.firstName
        let foundAppointment = await database.Appointment.findByIdAndUpdate(req.params.appointment_id, req.body, {new:true});
        return res.status(200).json(foundAppointment);
    } catch(e){
        return next(e)
    }
}