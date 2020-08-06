// var passport = require('passport');
var config = require('../config/database');
// require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post( '/',function (req, res) {
  var token = jwt.sign(req.body, config.secret, {
    expiresIn: 604800 // 1 week
  });
  res.json({ success: true, token: 'JWT ' + token});
});


module.exports = router;
