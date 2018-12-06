const database = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function(req,res,next){
    try{
        let expert = await database.Expert.findOne({
            mail: req.body.mail
        });
        let {id, firstName, mail}=expert;
        let isMatch = await expert.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                    id,
                    firstName,
                    mail
                }, process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                firstName,
                mail,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    } catch(e){
        return next({
            status: 400,
            message: "Invalid Email/Password."
        })
    }    
}

exports.signup = async function(req, res, next){
    try {
        //create a user
        let expert = await database.Expert.create(req.body);
        let {id, firstName, mail}=expert;
        let token =jwt.sign({
                id,
                firstName,
                mail,
            }, process.env.SECRET_KEY
        );
        return res.status(200).json({
            id, 
            firstName,
            mail,
            token
        })
    } catch(err){
        if(err.code === 11000){
          err.message= "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}