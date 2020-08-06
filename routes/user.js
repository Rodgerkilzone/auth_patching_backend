var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var jsonpatch = require('json-patch')
var router = express.Router();

router.post('/patch', passport.authenticate('jwt', { session: false }),  function (req, res) {
    try{

        let result = jsonpatch.apply(req.body.json, req.body.patch);
        res.json({ success: true, result: result});
    }
        catch(e){
        return res.status(500).json({success:false,msg:{ error: e.error || 'internal server error' }})
        
}
 
})




module.exports = router;

