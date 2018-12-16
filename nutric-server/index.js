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
        //recipesRoutes              = require("./routes/recipes");
        mealPlanRoutes                = require("./routes/mealPlan")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES
//test: quiero probar el la busqueda de comidas mientras escribes la comida (mostrar resultados tras escribir en el search-bar)
//documentation -> https://docs.mongodb.com/manual/reference/method/db.collection.find/

    //PARA PROBAR:
    // desde cualquier navegador a  https://nutric-svenbm.c9users.io/?lookUpFood=pollo
      // funciona ok. ponerlo como req.body de un input
const database = require("./models");
app.get("/", function(req,res,next){
    var searchedFood=req.query.lookUpFood;
    database.Food.find({
      foodName_lowercase: {
        $regex:new RegExp(searchedFood.toLowerCase())
      }
    }, function(err,data){
      res.json(data);
    }).limit(5); //aca limitamos los resultados
 });

// NUTRIS - PACIENTES, SCHEDULEDAPPOINTMENTS, APPOINTMENTS
app.use("/api/experts/", expertAuthRoutes)
app.use("/api/experts/:expert_id/appointments", appointmentsRoutes)
app.use("/api/experts/:expert_id/scheduledappointments", scheduledAppointmentsRoutes)
app.use("/api/experts/:expert_id/patients", patientRoutes)
app.use("/api/experts/:expert_id/mealplan", mealPlanRoutes)



// RECIPES
// app.use('/api/recipes', recipesRoutes);

//ERROR HANDLER
app.use(errorHandler);

//SERVER LISTENING - process.env.PORT = 8080 por default en c9
app.listen(8081, function(){
  console.log('Server started on port ' + 8081);
});
