const { EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE} = require('./../kafka/topics/topic_names');

var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Employer = require('./../models/employer/EmployerModel');
var EmployerAuth = require('../models/employer/EmployerAuthModel');
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { HOST_URL } = require('./../utils/config');
const { checkAuth, auth } = require('./../utils/passport');
const { secret } = require('./../utils/config')
var bcrypt = require("bcrypt");
var multer = require('multer');
const path = require("path");
auth();

const profile_storage = multer.diskStorage({
    destination: "./public/uploads/profile_pictures/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const profilePicUpload = multer({
    storage: profile_storage,
    limits: { fileSize: 1000000 },
}).single('profileImage');
/* GET users listing. */


router.post('/signin', function (req, res) {
    console.log("Inside Employer signin", JSON.stringify(req.body), " Secret: ", secret);

    EmployerAuth.findOne({ Email: req.body.username }, (error, employerAuth) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (employerAuth) {
            if (bcrypt.compareSync(req.body.password, employerAuth.Password)) {
                Employer.findOne({Email:req.body.username}).exec((err,employer)=>{
                    if(err){
                        res.status(401).end("Invalid Credentials");
                        return;
                    }
                    const payload = {
                        Email: employerAuth.Email,
                        _id: employer._id,
                        type: "employer" 
                    };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    res.status(200).end("JWT " + token);
                    return;
                })
            } else {
                res.status(401).end("Invalid Credentials");
                return;
            }
        }
        else {
            res.status(401).end("Invalid Credentials");
            return;
        }
    });
});

router.post('/signup', function (req, res) {
    console.log("Inside Employer Signup");
    kafka.make_request( EMPLOYER_SIGNUP, req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
            return;
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            const payload = {
                Email: results.Email,
                type: "employer",
                _id: results._id,
            };
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            res.status(200).end("JWT " + token);
            res.end();
            return;  
        }
    }); 
});

router.get("/:employer_email",function (req, res) {

    console.log("Inside employer Details: ", req.params.employer_email);

    kafka.make_request( GET_EMPLOYER_DETAILS, req.params.employer_email, function (err, results) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err,    
            })
            res.end();
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            // const payload = {student: results};
            res.json({
                data: results,
            })
            res.status(200).end();
            res.end();
            return; 
        }
    });
});

router.post("/update_profile", function (req, res) {
    console.log("data: ", JSON.stringify(req.body.data));
    kafka.make_request( UPDATE_EMPLOYER_PROFILE, req.body.data, function (err, results) {
        console.log('in result');
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            res.json({
                data: results,
            })
            res.end();
            return;
        }
    });
});

router.get("/get_profile_picture/:_id",function (req, res) {
    console.log("Inside Employer get_profile_picture: ", req.params._id);
    Employer.findOne({ _id: req.params._id }).exec((err, results) => {
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results.ProfileUrl));
            res.json({
                data: results.ProfileUrl,
            })
            res.end();
            return;
        }
    });
});


router.post('/upload-profile' ,profilePicUpload, (req, res, next) => {
    console.log("Request ---", JSON.stringify(req.body));
    // const path = req.file.path;
    // const user_type = req.body.user_type;
    const email = req.body.email;
    const profile_url = HOST_URL + "/uploads/profile_pictures/" + req.file.filename;
    console.log("profile_url: " + profile_url);
    Employer.updateOne({ Email: email }, { $set: { "ProfileUrl": profile_url } }).exec((err, results) => {
      if (err) {
        res.json({
          status: "error",
          msg: err,
        })
      } else {
        res.status(200).json({ 'message': 'Upload was  Successful', 'ProfileUrl': profile_url });
      }
    });
  }
);

  
module.exports = router;
