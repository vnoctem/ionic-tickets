var passport = require('passport');
var router = require('express').Router();
var userFriends = require('../models/friends');
var _ = require('lodash');

router.get('/:userId', passport.authenticate('jwt', { session: false }), function (req, res) {
    for (let i = 0; i < userFriends.length; i++) {
        if (userFriends[i].userId == req.params.userId) {
            let friends = _.cloneDeep(userFriends[i].friends);
            _.map(friends, (friend) => {
                friend.photo = 'http://' + req.headers.host + friend.photo;
                return friend;
            });
            res.json({ 'success': true, 'friends': friends });
            return;
        }
    }
    res.json({ 'success': false });
});

module.exports = router;