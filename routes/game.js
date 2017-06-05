var express = require('express');
var router = express.Router();
if (!process.env.MAPMAKERURL) throw new Error('Please specify where the mapmaker can be found with MAPMAKERURL');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var maurl = process.env.MAPMAKERURL;
  
  res.render('game', { controls: req.body.controls, skipWait: req.body.skipWait, mmaurl: mmaurl });
});

module.exports = router;
