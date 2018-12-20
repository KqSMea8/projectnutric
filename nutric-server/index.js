require("dotenv").config();
const   express                       = require("express"),
        app                           = express(),
        mongoose                      = require('mongoose'),
        bodyParser                    = require('body-parser'),
        cors                          = require('cors'),
        errorHandler                  = require("./handlers/error");
      
const   expertAuthRoutes              = require("./routes/expertAuth"),
        patientRoutes                 = require("./routes/patients"),
        scheduledAppointmentsRoutes   = require("./routes/scheduledAppointments"),
        appointmentsRoutes            = require("./routes/appointments"),
        mealPlanRoutes                = require("./routes/mealPlan"),
        mealPlanTemplateRoutes        = require("./routes/mealPlanTemplate"),
        recipesRoutes                 = require("./routes/recipes"),
        foodsRoutes                   = require("./routes/foods");
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES

// NUTRIS - PACIENTES, SCHEDULEDAPPOINTMENTS, APPOINTMENTS
app.use("/api/experts/", expertAuthRoutes);
app.use("/api/experts/:expert_id/appointments", appointmentsRoutes);
app.use("/api/experts/:expert_id/scheduledappointments", scheduledAppointmentsRoutes);
app.use("/api/experts/:expert_id/patients", patientRoutes);
app.use("/api/experts/:expert_id/mealPlan", mealPlanRoutes);
app.use("/api/experts/:expert_id/mealPlanTemplate", mealPlanTemplateRoutes);
app.use("/api/experts/:expert_id/recipes", recipesRoutes);
app.use("/api/experts/:expert_id/foods", foodsRoutes);



// RECIPES
// app.use('/api/recipes', recipesRoutes);

//ERROR HANDLER
app.use(errorHandler);

//SERVER LISTENING - process.env.PORT = 8080 por default en c9
app.listen(8081, function(){
  console.log('Server started on port ' + 8081);
});
