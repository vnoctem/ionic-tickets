var passport = require('passport');
var router = require('express').Router();
var adBanner = require('../models/adBanner');

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({
        'adBanner': {
            'src': 'http://' + req.headers.host + adBanner.src
        } 
    });
});

module.exports = router;