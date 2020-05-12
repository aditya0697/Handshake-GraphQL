var { REGISTER, GET_REGISTRATION_FOR_EMPLOYRE, GET_REGISTRATION_FOR_STUDENT } = require('./../kafka/topics/topic_names');
var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Registrations = require('./../models/event/RegistrationModel');
const passport = require('passport');
const { checkAuth, auth } = require('./../utils/passport');
auth();



router.post('/register', function(req, res){

    const rigistrations = {
        Event: req.body.Event,
        Student: req.body.Student,
    } 
    console.log("--------- rigistrations data: ", JSON.stringify(rigistrations));

    kafka.make_request(REGISTER, rigistrations, function (err, results) {
        console.log('in result');
        console.log("Results: ", results);
        console.log("Error: ", err);
        if (!results) {
            console.log("Inside err"); 
            res.status(404);
            res.end("Rigistrations already exists");
            return;
        } else {
            console.log("Inside data");
            console.log(" rigistrations Data:", JSON.stringify(results));
            res.json(results)
            res.status(200).end();
            return;
        }
    });
});


router.get('/employer', function (req, res) {
    const data = {
        employer_id: req.query.employer_id,
        page: req.query.page,
        limit: req.query.limit,
    }
    // console.log("Data: ", JSON.stringify(req.query));
    kafka.make_request(GET_REGISTRATION_FOR_EMPLOYRE, data, function (err, results) {
        // console.log('in result', JSON.stringify(err));
        if (!results) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
        } else {
            console.log("Inside data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(results)
            res.end();
            return;
        }
    });
});

router.get('/student', function (req, res) {
    const data = {
        student_id: req.query.student_id, 
        page: req.query.page,
        limit: req.query.limit,
    }
    // console.log("Data: ", JSON.stringify(req.query));
    kafka.make_request(GET_REGISTRATION_FOR_STUDENT, data, function (err, results) {
        // console.log('in result', JSON.stringify(err));
        if (!results) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
        } else {
            console.log("Inside data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(results)
            res.end();
            return;
        }
    });
});
module.exports = router;
