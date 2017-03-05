var strategy = require('../config/strategy');
var router = require('express').Router();
var usersTickets = require('../models/tickets');
var _ = require('lodash');

router.get('/:userId', strategy, function (req, res) {
    for (let i = 0; i < usersTickets.length; i++) {
        if (usersTickets[i].userId == req.params.userId) {
            let tickets = _.cloneDeep(usersTickets[i].tickets);
            _.map(tickets, (ticket) => {
                ticket.poster = 'http://' + req.headers.host + ticket.poster;
                return ticket;
            });
            res.json({ 'tickets': tickets });
            return;
        }
    }
    res.json({});
});

module.exports = router;