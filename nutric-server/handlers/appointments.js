const database = require("../models");

exports.createAppointment = async function(req,res,next){
  try {
    let newAppointment = await database.Appointment.create({
      realStartTime: req.body.realStartTime,
      realDuration: req.body.realDuration,
      realTimeEnd: req.body.realTimeEnd,
      reason: req.body.reason,
      // mandar realDuration como put con tiempo del timer
      scheduledInfo: {
        wasScheduled: false,
        scheduledTimeStart: req.body.scheduledTimeStart,
        scheduledTimeEnd: req.body.scheduledTimeEnd,
        scheduledDuration: req.body.scheduledDuration,
        notes: req.body.notes
      },
      patient: req.params.patient_id,
      expert: req.params.expert_id
    });
    
    let foundExpert = await database.Expert.findById(req.params.expert_id);
    foundExpert.appointments.push(newAppointment._id);
    await foundExpert.save();
    
    let foundPatient = await database.Patient.findById(req.params.patient_id);
    foundPatient.appointments.push(newAppointment._id);
    await foundPatient.save();
    
    return res.status(200).json(newAppointment);
  } 
  catch(e){
    return next(e);
  }
};


exports.getAppointments = async function(req,res,next){
    try {
        let foundAppointments = await database.Appointment.find({expert:req.params.expert_id}).populate('patient');
        return res.status(200).json(foundAppointments);
    } catch(error){
        return next(error);
    }
};

exports.getOneAppointment = async function(req, res, next){
   try{
    let foundAppointment = await database.Appointment.findById(req.params.appointment_id);
    return res.status(200).json(foundAppointment);
   }  
   catch(e){
      return next(e);
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
    // mandar realDuration como put con tiempo del timer
    try{
        let foundAppointment = await database.Appointment.findByIdAndUpdate(req.params.appointment_id, req.body, {new:true});
        return res.status(200).json(foundAppointment);
    } catch(e){
        return next(e)
    }
}