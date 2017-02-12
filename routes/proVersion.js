var passport = require('passport');
var router = require('express').Router();

router.post('/buy', passport.authenticate('jwt', { session: false }), function (req, res) {
    // simple validation
    // just make sure that all fields we need are present
    if (req.body.cardName && req.body.cardNumber && req.body.expirationYear && req.body.expirationMonth) {
        res.json({ 'success': true });
        return;
    }

    res.json({ 'success': false });
});

module.exports = router;