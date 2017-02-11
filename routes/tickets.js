var passport = require('passport');
var router = require('express').Router();
var usersTickets = require('../models/tickets');
var _ = require('lodash');

router.get('/:userId', passport.authenticate('jwt', { session: false }), function (req, res) {
    for (let i = 0; i < usersTickets.length; i++) {
        if (usersTickets[i].userId == req.params.userId) {
            let tickets = _.cloneDeep(usersTickets[i].tickets);
            _.map(tickets, (ticket) => {
                ticket.poster = 'http://' + req.headers.host + ticket.poster;
                return ticket;
            });
            res.json({ 'success': true, 'tickets': tickets });
            return;
        }
    }
    res.json({ 'success': false });
});

module.exports = router;