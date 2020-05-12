const { CREATE_CONVERSATION, ADD_MESSAGE_TO_CONVERSATION,
  CREATE_MESSAGE, GET_CONVERSATIONS, GET_CHAT } = require('./../kafka/topics/topic_names');

var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Job = require('./../models/job/JobModel');
const { checkAuth, auth } = require('./../utils/passport');


auth();

/* GET users listing. */
router.post('/create_conversation', function (req, res, next) {
  
  console.log("Data: ", JSON.stringify(req.body));
  
  kafka.make_request(CREATE_CONVERSATION, req.body, function (err, results) {
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
      console.log("Data:", JSON.stringify(results));  
      res.status(200);
      res.json(results)
      res.end(); 
      return;
    }
  });
});


router.get("/get_convesations",function (req, res) {
  const data = {
      PersonId: req.query.PersonId,
      page: req.query.page,
      limit: req.query.limit,
  }
  console.log("Data: ", JSON.stringify(req.query));
  kafka.make_request(GET_CONVERSATIONS, data, function (err, results) {
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

router.post('/add_message_to_conversation', function (req, res, next) {
  
  console.log("Data: ", JSON.stringify(req.body));
  
  kafka.make_request(ADD_MESSAGE_TO_CONVERSATION, req.body, function (err, results) {
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
      console.log("Data:", JSON.stringify(results));  
      res.status(200);
      res.json(results)
      res.end(); 
      return;
    }
  });
});

module.exports = router;
