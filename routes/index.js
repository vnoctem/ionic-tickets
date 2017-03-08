var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var router = require('express').Router();

// DATA
var admin = require('../models/admin');
var secret = require('../config/secret');

router.post('/login', function (req, res, next) {
    if (!req.body.password || !req.body.username) {
        // Bad request
        res.status(400).json({ 'message': 'Le nom d\'utilisateur ou Le mot de passe est invalide' });
        return;
    }

    // Compare password with bcrypt
    bcrypt.compare(req.body.password, admin.password).then(function (success) {
        if (success) {
            let ret = _.cloneDeep(admin);
            // Replace 'password' element by the one with clear text
            ret['password'] = req.body.password;
            // Create token
            ret['token'] = jwt.sign(admin, secret.key, {
                expiresIn: 300 // expires in 5 min
            });
            ret['photo'] = 'http://' + req.headers.host + ret['photo'];

            res.json({ 'user': ret });
        } else {
            res.status(400).json({ 'message': 'Le mot de passe est incorrect' });
        }
    });
});

module.exports = router;
