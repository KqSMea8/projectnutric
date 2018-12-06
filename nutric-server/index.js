require("dotenv").config();
const   express         = require("express"),
        mongoose        = require('mongoose'),
        app             = express(),
        bodyParser      = require('body-parser'),
        cors            = require('cors'),
        database        = require('./models'),
        errorHandler    = require("./handlers/error"),
        expertAuthRoutes= require("./routes/expertAuth"),
        patientRoute    = require("./routes/patients");


const {loginRequired, ensureCorrectUser} = require("./middleware/auth")
        
        

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//ROUTES
app.get("/", function(req,res,next){
    res.send("Hello World");
 });

app.use("/api/experts/", expertAuthRoutes)

// app.use("/api/", 
//     // loginRequired,
//     // ensureCorrectUser,
//     patientRoute
//     );
 
 
//ERROR HANDLER
app.use(errorHandler);

//SERVER LISTENING
app.listen(process.env.PORT, function(){
  console.log('Server started on port ' + process.env.PORT);
});
