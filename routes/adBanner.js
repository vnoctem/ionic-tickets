var strategy = require('../config/strategy');
var router = require('express').Router();
var adBanner = require('../models/adBanner');

router.get('/', strategy, function (req, res) {
    res.json({
        'adBanner': {
            'src': 'http://' + req.headers.host + adBanner.src
        } 
    });
});

module.exports = router;