const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../config/database');

module.exports = function (passport) {
    let opts = {};
    // opts.jwtFormRequest = ExtractJwt.fromAuthHeader();
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts.jwtFormRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    // opts.secretOrKey = config.secret;
    // passport.use(new JwtStrategy(opts, function(jwt_payload, done)  {
    //     User.getUserById(jwt_payload.data._id, function(err, user)  {
    //         // User.getUserById(jwt_payload._id, function(err, user) => {
    //         if(err){
    //             return done(err, false);
    //         }
    //         if(user){
    //             return done(null, user);
    //         }else{
    //             return done(null, false);
    //         }
    //     });
    // }));

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
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
    }));
}
