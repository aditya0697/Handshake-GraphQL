var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
const http = require('http');
// var authRouter = require('./routes/auth');
// var studentRouter = require('./routes/student');
// var employerRouter = require('./routes/employer');
// var eventRouter = require('./routes/event');
// var jobRouter = require('./routes/job');
// var messageRouter = require('./routes/message');
// var applicationRouter = require('./routes/application');
// var registrationRouter = require('./routes/registrations');
var session = require('express-session');
const { mongoDB, frontendURL } = require('./utils/config');
const passport = require('passport');
const { auth } = require("./utils/passport");
const mongoose = require('mongoose'); 
var cors = require('cors');
const socketio = require('socket.io');
var graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
var app = express();
    

const server = http.createServer(app);
const io = socketio(server);

// Passport middleware
// app.use(passport.initialize());
 

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 400,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        
        console.log(`MongoDB Connected`);
    }
});




// app.use('/', indexRouter);
// app.use('/users', authRouter);
// app.use('/student', studentRouter);
// app.use('/employer', employerRouter);
// app.use('/event', eventRouter);
// app.use('/job', jobRouter);
// app.use('/message', messageRouter);
// app.use('/application', applicationRouter);
// app.use('/registration', registrationRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql : true
}));

// io.on('connect', (socket) => {
//   console.log(' user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//   socket.on('create_conversation',({ name, room }, callback) => {

//   });
// });


module.exports = app;
// server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`)); 