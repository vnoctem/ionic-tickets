var passport = require('passport');
var router = require('express').Router();
var usersTickets = require('../models/tickets');

router.get('/:userId', passport.authenticate('jwt', { session: false }), function (req, res) {
    for (let i = 0; i < usersTickets.length; i++) {
        if (usersTickets[i].userId == req.params.userId) {
            res.json({ 'success': true, 'tickets': usersTickets[i].tickets });
            return;
        }
    }
    res.json({ 'success': false });
});

module.exports = router;