var strategy = require('../config/strategy');
var router = require('express').Router();
var userFriends = require('../models/friends');
var friendShows = require('../models/shows');
var _ = require('lodash');

router.get('/:userId', strategy, function (req, res) {
    for (let i = 0; i < userFriends.length; i++) {
        if (userFriends[i].userId == req.params.userId) {
            let friends = _.cloneDeep(userFriends[i].friends);
            _.map(friends, (friend) => {
                friend.photo = 'http://' + req.headers.host + friend.photo;
                return friend;
            });
            res.json({ 'friends': friends });
            return;
        }
    }
    res.json({ 'friends': [] });
});

router.get('/:friendId/shows', strategy, function (req, res) {
    for (let i = 0; i < friendShows.length; i++) {
        if (friendShows[i].friendId == req.params.friendId) {
            let shows = _.cloneDeep(friendShows[i].shows);
            _.map(shows, (show) => {
                show.poster = 'http://' + req.headers.host + show.poster;
                return show;
            });
            res.json({ 'shows': shows });
            return;
        }
    }
    res.json({ 'shows': [] });
});

module.exports = router;