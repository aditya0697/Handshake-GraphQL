const { STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS } = require('./../kafka/topics/topic_names');

var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Student = require('./../models/student/StudentModel');
var StudentAuth = require('../models/student/StudentAuthModel');
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
  console.log("Inside student signin", JSON.stringify(req.body), " Secret: ", secret);
  StudentAuth.findOne({ Email: req.body.username }, (error, studentAuth) => {
    if (error) {
      res.status(500).end("Error Occured");
    }
    if (studentAuth) {
      if (bcrypt.compareSync(req.body.password, studentAuth.Password)) {
        Student.findOne({ Email: req.body.username }).exec((err, student) => {
          if (err) {
            res.status(401).end("Invalid Credentials");
            return;
          }
          const payload = {
            Email: student.Email,
            _id: student._id,
            type: "student"
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          res.status(200).end("JWT " + token);
          return;
        });
      }
      else {
        res.status(401).end("Invalid Credentials");
        return;
      }
    }
  });
});


router.post('/signup', function (req, res) {
  console.log("Inside Student Signup");
  kafka.make_request(STUDENT_SIGNUP, req.body, function (err, results) {
    console.log('in result');
    // console.log(results);
    // console.log(err);
    if (err) {
      // console.log("Inside err");
      res.status(404);
      res.json({
        status: "error",
        msg: err,
      })
      res.end();
      return;
    } else {
      // console.log("Inside data");
      // console.log("Data:", JSON.stringify(results));
      const payload = {
        Email: results.Email,
        _id: results._id,
        type: "student"
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


router.get("/email/:student_email", function (req, res) {
  console.log("Inside Student Details: ", req.params.student_email);
  kafka.make_request(GET_STUDENT_DETAILS, req.params.student_email, function (err, results) {
    // console.log('in result');
    if (err) {
      // console.log("Inside err");
      res.status(404);
      res.json({
        status: "error",
        msg: err,
      })
      res.end();
    } else {
      // console.log("Inside data");
      // console.log("Data:", JSON.stringify(results));
      // const payload = {student: results};
      res.json(results)
      res.status(200).end();
      res.end();
      return;
    }
  });
});

router.post("/update_profile", function (req, res) {
  console.log("data: ", JSON.stringify(req.body.data));
  kafka.make_request(UPDATE_STUDENT_PROFILE, req.body.data, function (err, results) {
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
      // console.log("Inside data");
      // console.log("Data:", JSON.stringify(results));
      res.json(results)
      res.end();
      return;
    }
  });
});

// router.post("/update_experience", checkAuth, function (req, res) {
// });

// router.post("/add_education",checkAuth,  function (req, res) {   
// });

// router.post("/add_experience", checkAuth, function (req, res) {
// });

// router.post("/update_objective", checkAuth, function (req, res) {

// });

// router.post("/add_objective", checkAuth, function (req, res) {
// });

router.get("/get_profile_picture/:student_email", function (req, res) {
  console.log("Inside Student get_profile_picture: ", req.params.student_email);
  Student.findOne({ Email: req.params.student_email }).exec((err, results) => {
    if (err) {
      // console.log("Inside err");
      res.status(404);
      res.json({
        status: "error",
        msg: err,
      })
      res.end();
    } else {
      // console.log("Inside data");
      // console.log("Data:", JSON.stringify(results.ProfileUrl));
      res.json(results)
      res.end();
      return;
    }
  });
});

router.post('/upload-profile', profilePicUpload, (req, res, next) => {
  console.log("Request ---", JSON.stringify(req.body));
  // const path = req.file.path;
  // const user_type = req.body.user_type;
  const email = req.body.email;
  const profile_url = HOST_URL + "/uploads/profile_pictures/" + req.file.filename;
  console.log("profile_url: " + profile_url);
  Student.updateOne({ Email: email }, { $set: { "ProfileUrl": profile_url } }).exec((err, results) => {
    if (err) {
      res.status(404);
      res.json({
        status: "error",
        msg: err,
      })
    } else {
      res.status(200).json({ 'message': 'Upload was  Successful', 'profile_url': profile_url });
    }
  });
}
);

router.get('/students', (req, res) => {
  // console.log("page: ", JSON.stringify(req.query.page));
  // console.log("limit: ", JSON.stringify(req.query.limit));
  // console.log("Inside get_students: ");
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

module.exports = router;
