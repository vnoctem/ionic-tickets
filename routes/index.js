var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var router = require('express').Router();

// DATA
var admin = require('../models/admin');
var secret = require('../config/secret');

router.post('/login', function (req, res, next) {
    if (!req.body.password) {
        // Bad request
        res.status(400).json({ 'message': 'Le mot de passe est invalide' });
        return;
    }

    // Compare password with bcrypt
    bcrypt.compare(req.body.password, admin.password).then(function (success) {
        if (success) {
            // Replace 'password' element by the one with clear text
            var ret = _.cloneDeep(admin);
            ret['password'] = req.body.password;
            // Create token
            var token = jwt.encode(ret, secret.key);
            // Send back the token
            res.json({
                'user': {
                    'id': admin.id,
                    'username': admin.username,
                    'fullname': admin.fullname,
                    'photo': 'http://' + req.headers.host + admin.photo,
                    'token': `JWT ${token}`
                }
            });
        } else {
            res.status(400).json({ 'message': 'Le mot de passe est incorrect' });;
        }
    });
});

module.exports = router;
