var { APPLY_JOB, UPDATE_APPLICATION_STATUS, WITHDRAW_APPLICATION, GET_APPLICATIONS_FOR_EMPLOYER, GET_APPLICATIONS_FOR_STUDENT } = require('./../kafka/topics/topic_names');
var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Application = require('./../models/job/ApplicationModel');
const passport = require('passport');
const { checkAuth, auth } = require('./../utils/passport');
var multer = require('multer');
const path = require("path");
const { HOST_URL } = require('./../utils/config');
auth();

const resume_storage = multer.diskStorage({
    destination: "./public/uploads/resume/",
    filename: function (req, file, cb) {
        cb(null, "Resume-" + Date.now() + path.extname(file.originalname));
    }
});

const resumeUpload = multer({
    storage: resume_storage,
    limits: { fileSize: 1000000 },
}).single('resume_file');



router.post('/apply', resumeUpload, (req, res, next) => {
    console.log("Inside create job", JSON.stringify(req.file));
    if (!req.file) {
        res.status(404);
        res.json({
            status: "error",
            msg: "Resume file is missing",
        })
        res.end();
        return;
    }
    const resume_url = HOST_URL + "/uploads/resume/" + req.file.filename;
    const job = JSON.parse(req.body.Job);
    const student = JSON.parse(req.body.Student);
    const application = {
        Job: job,
        Student: student,
        ResumeURL: resume_url,
        Status: req.body.Status,
    } 
    console.log("--------- Application data: ", JSON.stringify(job));

    kafka.make_request(APPLY_JOB, application, function (err, results) {
        console.log('in result');
        console.log("Results: ", results);
        console.log("Error: ", err);
        if (!results) {
            console.log("Inside err");
            res.status(404);
            res.end("Application already exists");
            return;
        } else {
            console.log("Inside data");
            console.log(" Application Data:", JSON.stringify(results));
            res.json(results)
            res.status(200).end();
            return;
        }
    });
});

router.post("/update_application_status", function (req, res) {
    const application = req.body;
    console.log("--------- Application data: ", JSON.stringify(req.body));

    kafka.make_request(UPDATE_APPLICATION_STATUS, application, function (error, results) {
        console.log('in result');
        console.log(results);
        console.log("err:", JSON.stringify(error));
        if (!results) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Application not found",
            })
            res.end();
            return;
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            res.json(results)
            res.status(200).end();
            res.end();
            return;
        }
    });
});

router.delete("/withdraw_application", function (req, res) {
});

router.get("/employer/",function (req, res) {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
    }
    console.log("Data: ", JSON.stringify(req.query));
    kafka.make_request(GET_STUDENTS, data, function (err, results) {
        // console.log('in result', JSON.stringify(err));
        if (err) {
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

router.get("/get_applications", function (req, res) {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
        id: req.query.id,
        user_type: req.query.type,
    }
    console.log("Data: ", JSON.stringify(req.query));
    if (req.query.type == "employer") {
        kafka.make_request(GET_APPLICATIONS_FOR_EMPLOYER, data, function (err, results) {
            // console.log('in result', JSON.stringify(err));
            if (err) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: err,
                })
                res.end();
                return;
            } else {
                console.log("Inside data");
                // console.log("Data:", JSON.stringify(results)); 
                res.status(200);
                res.json(results)
                res.end();
                return;
            }
        });

    } else if (req.query.type == "student") {
        kafka.make_request(GET_APPLICATIONS_FOR_STUDENT, data, function (err, results) {
            // console.log('in result', JSON.stringify(err));
            if (err) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: err,
                })
                res.end();
                return;
            } else {
                console.log("Inside data");
                // console.log("Data:", JSON.stringify(results));
                res.status(200);
                res.json(results)
                res.end();
                return;
            }
        });
    } else {
        res.status(404);
        res.json({
            status: "error",
            msg: "user type not specified",
        })
        res.end();
        return;
    }

});


module.exports = router;
