var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var jsonpatch = require('json-patch');
const { patch } = require('request');
var router = express.Router();

router.post('/patch',  passport.authenticate('jwt', { session: false }), function (req, res) {

    
    try{

        let result = patch(req.body.json, req.body.patch)
        res.json({ success: true, result: result});
        patch(req.body.json, req.body.patch)
    }
        catch(e){
        return res.status(500).json({success:false,msg:{ error: e.error || 'internal server error' }})
        
}

//patching function
function patch(json,patch){
    let result = jsonpatch.apply(json,patch);
  return result;
}
 
})




module.exports = router;

