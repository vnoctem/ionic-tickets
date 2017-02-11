var passport = require('passport');
var router = require('express').Router();

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ 'username': req.user.username });
});

module.exports = router;