var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();



router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    req.logout();
    res.json({ success: true, msg: 'Sign out successfully.' });
});
module.exports = router;