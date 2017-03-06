var strategy = require('../config/strategy');
var router = require('express').Router();

router.post('/buy', strategy, function (req, res) {
    // simple validation
    // just make sure that all fields we need are present
    if (req.body.cardName && req.body.cardNumber && req.body.expirationYear && req.body.expirationMonth) {
        res.json({});
    } else {
        if (!req.body.cardName) {
            res.status(400).json({ 'message': 'Le nom de la carte est manquant' });
        } else if (!req.body.cardNumber) {
            res.status(400).json({ 'message': 'Le numéro de la carte est manquant' });
        } else if (!req.body.expirationYear || !req.body.expirationMonth) {
            res.status(400).json({ 'message': 'L\'expiration de la carte est manquant' });
        }
    }
});

module.exports = router;