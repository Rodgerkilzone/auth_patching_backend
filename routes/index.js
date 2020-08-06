var express = require('express')
var router = express.Router()

router.use('/signin', require('./login'))
router.use('/signout', require('./logout'))
router.use('/user', require('./user'))
router.post('/', function (req, res) {
  res.send('Apis')
})



module.exports = router