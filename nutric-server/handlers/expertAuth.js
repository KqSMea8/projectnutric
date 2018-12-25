const database = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt')

// poner deleteExpert aqui?

exports.login = async function(req, res, next) {
    try {
        let expert = await database.Expert.findOne({
            mail: req.body.mail
        });
        let { id, firstName, mail } = expert;
        let isMatch = await expert.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                firstName,
                mail
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                firstName,
                mail,
                token,
                message: "You are logged in as " + firstName + "!"
            })
        }
        else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    }
    catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        })
    }
}

exports.signup = async function(req, res, next) {
    try {
        //create a user
        let expert = await database.Expert.create(req.body);
        let { id, firstName, mail } = expert;
        let token = jwt.sign({
            id,
            firstName,
            mail,
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            firstName,
            mail,
            token
        })
    }
    catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.forgotPassword = async function(req, res, next) {
    if (req.body.email === '') {
        res.json('email required');
    }
    console.log(req.body.email);

    let foundExpert = await database.Expert.find({ email: req.body.email })
    if (foundExpert === null) {
        console.log('email not in database');
        res.json('email not in db');
    }
    else {
        const token = crypto.randomBytes(10).toString('hex');

        foundExpert.resetPasswordToken = token;
        foundExpert.resetPasswordExpires = Date.now() + 360000;

        console.log(foundExpert)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: "sven.occoner@gmail.com",
                clientId: "1045687706652-hosk3f246hhjmjq1fr5nu0r8ldpfhgvj.apps.googleusercontent.com",
                clientSecret: "qoIqmogjDtjnORo9oaHCXPWo",
                refreshToken: "1/ZtUabfep3_HjCSn3Gz_34u7w1R0eeVCeT32i4cfLV9HAkr9K6TtCjbdRmtS2vMM7",
                accessToken: "ya29.GlshBphOwuj5F9I-gBD-4ZU-QcK5eJy4IhvZb3vjbFHbstxJmr0nftFDLoZY-KH1ZPKHUJ-s0rIsgaB9qQO0JQcsqDxfa02-_8zmIeS-qRoTJPrybQgcel_iLpLI"
            },
        });

        const mailOptions = {
            from: 'sven.occoner@gmail.com',
            to: `projectnultron@gmail.com`,
            subject: `Link To Reset Password`,
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
                `https://nutric-svenbm.c9users.io/reset/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.error('there was an error: ', err);
            }
            else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }
        });
    };
}

exports.resetToken = async function(req, res, next) {

    let foundExpert = await database.Expert.find({ resetPasswordToken: req.query.resetPasswordToken })

    if (foundExpert == null) {
        console.log('password reset link is invalid or has expired');
        res.json('password reset link is invalid or has expired');
    }
    else {
        res.status(200).send({
            firstName: foundExpert.firstName,
            message: 'password reset link a-ok',
        });
    }



}
const BCRYPT_SALT_ROUNDS = 12
exports.updatePassword = async function(req, res, next) {

    let foundExpert = await database.Expert.find({ firstName: req.body.firstName })

    if (foundExpert != null) {
        console.log('user exists in db');
        bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
                foundExpert.update({
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                });
            })
            .then(() => {
                console.log('password updated');
                res.status(200).send({ message: 'password updated' });
            });
    }
    else {
        console.log('no user exists in db to update');
        res.status(404).json('no user exists in db to update');
    }
}
