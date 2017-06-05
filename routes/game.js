var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var mmaurl = 'http://localhost:3000';
  if (!process.env.MAPMAKER_PORT) mmaurl = process.env.MAPMAKER_PORT;
  
  res.render('game', { controls: req.body.controls, skipWait: req.body.skipWait, mmaurl: mmaurl });
});

module.exports = router;
