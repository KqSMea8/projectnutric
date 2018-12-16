// falta cambiar de Appointment a appointment
const database = require("../models");

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
        let foundAppointment = await database.Appointment.findByIdAndUpdate(req.params.appointment_id, req.body, {new:true});
        return res.status(200).json(foundAppointment);
    } catch(e){
        return next(e)
    }
}