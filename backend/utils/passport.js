const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');
const {secret} = require('./config');
const StudentAuth = require('./../models/student/StudentAuthModel');
const EmployerAuth = require('./../models/employer/EmployerAuthModel');

function auth() {
    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("jwt"),
        secretOrKey: secret
    };
    
    passport.use( 
        new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("Inside passport:", JSON.stringify(jwt_payload));

        if (jwt_payload.type == "student") {
            StudentAuth.findOne({ Email: jwt_payload.Email }, function (err, user) {
                if (err) {
                    return done(err, false); 
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);  
                    // or you could create a new account
                }
            });
        }
        else {
            EmployerAuth.findOne({ Email: jwt_payload.Email }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }
    }
    ));
}
exports.auth = auth;  
exports.checkAuth = passport.authenticate('jwt', { session: false });