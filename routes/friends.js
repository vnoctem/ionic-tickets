var passport = require('passport');
var router = require('express').Router();
var userFriends = require('../models/friends');
var friendShows = require('../models/shows');
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

router.get('/:friendId/shows', passport.authenticate('jwt', { session: false }), function (req, res) {
    for (let i = 0; i < friendShows.length; i++) {
        if (friendShows[i].friendId == req.params.friendId) {
            let shows = _.cloneDeep(friendShows[i].shows);
            _.map(shows, (show) => {
                show.poster = 'http://' + req.headers.host + show.poster;
                return show;
            });
            res.json({ 'success': true, 'shows': shows });
            return;
        }
    }
    res.json({ 'success': false });
});

module.exports = router;