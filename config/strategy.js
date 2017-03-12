/* 
* JWT is implemented based on this tutorial:
* https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#set-up-our-node-application-packagejson
*/
var jwt = require('jsonwebtoken');

// Get all needed data
var secret = require('../config/secret');

module.exports = function (req, res, next) {
    // check header for token
    var token = req.headers['x-access-token'];

    if (token) {
        // verifies and checks expiration
        jwt.verify(token, secret.key, function (err, decoded) {
            if (err) {
                res.status(400).json({ 'message': 'Votre session a expiré', 'redirect': true });
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    } else {
        // if there is no token, return an error
        res.status(400).json({ 'message': 'Aucun token n\'est fourni' });
    }
}