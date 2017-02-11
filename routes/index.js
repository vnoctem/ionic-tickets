var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var router = require('express').Router();

// DATA
var admin = require('../models/admin');
var secret = require('../config/secret');

router.post('/login', function (req, res, next) {
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
                'success': true, 
                'token': `JWT ${token}` ,
                'user': {
                    'id': admin.id,
                    'username': admin.username,
                    'fullname': admin.fullname,
                    'photo': 'http://' + req.headers.host + admin.photo
                }
            });
        } else {
            res.json({ 'success': false });
        }
    });
});

module.exports = router;
