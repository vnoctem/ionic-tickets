var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcrypt');

// Get all needed data
var admin = require('../models/admin');
var secret = require('../config/secret');

module.exports = function (passport) {
    var opts = {
        'secretOrKey': secret.key,
        // Look for the JWT in the header
        'jwtFromRequest': ExtractJwt.fromAuthHeader()
    };

    // Configure the strategy
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // jwt_payload contains the decoded JWT payload
        // Check if this user exists

        // Compare password with bcrypt
        bcrypt.compare(jwt_payload.password, admin.password).then(function (res) {
            if (res) {
                done(null, admin);
            } else {
                done(null, false);
            }
        });
    }));
}