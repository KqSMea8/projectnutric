require("dotenv").config();
const   express                       = require("express"),
        mongoose                      = require('mongoose'),
        app                           = express(),
        bodyParser                    = require('body-parser'),
        cors                          = require('cors'),
        errorHandler                  = require("./handlers/error"),
        expertAuthRoutes              = require("./routes/expertAuth"),
        patientRoutes                 = require("./routes/patients"),
        scheduledAppointmentsRoutes   = require("./routes/scheduledAppointments");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES
app.get("/", function(req,res,next){
    res.send("Hello World");
 });

app.use("/api/experts/",                        expertAuthRoutes)
// app.use("/api/experts/:expert_id/appointments", appointmentsRoutes)
app.use("/api/experts/:expert_id/scheduledappointments", scheduledAppointmentsRoutes)
app.use("/api/experts/:expert_id/patients",     patientRoutes)

//ERROR HANDLER
app.use(errorHandler);

//SERVER LISTENING
app.listen(process.env.PORT, function(){
  console.log('Server started on port ' + process.env.PORT);
});
