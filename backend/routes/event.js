const { CREATE_EVENT, GET_EVENT_FOR_EMPLOYRE, GET_EVENT_FOR_STUDENT, UPDATE_EVENT } = require('./../kafka/topics/topic_names');

var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Job = require('./../models/job/JobModel');
const { checkAuth, auth } = require('./../utils/passport');
auth();


/* GET users listing. */
router.post('/create_event', function (req, res) {
    console.log("Inside create job");
    const event = req.body;
    console.log("--------- Job data: ", JSON.stringify(req.body));

    kafka.make_request(CREATE_EVENT, event, function (err, results) {
        console.log('in result');
        console.log(results);
        console.log(err);
        if (!results) {
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
            console.log("Data:", JSON.stringify(results));
            res.json(results)
            res.status(200).end();
            res.end();
            return;
        }
    });
});

router.post('/update_event', function (req, res) {
});

router.get('/employer', function (req, res) {
    const data = {
        employer_id: req.query.employer_id,
        page: req.query.page,
        limit: req.query.limit,
    }
    console.log("Data: ", JSON.stringify(req.query));
    kafka.make_request(GET_EVENT_FOR_EMPLOYRE, data, function (err, results) {
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
        Majors: JSON.parse(req.query.Majors),
        page: req.query.page,
        limit: req.query.limit,
    }
    console.log("Data: ", JSON.stringify(req.query));
    kafka.make_request(GET_EVENT_FOR_STUDENT, data, function (err, results) {
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
