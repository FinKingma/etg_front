var express = require('express');
var router = express.Router();
if (!process.env.MAPMAKERURL) throw new Error('Please specify where the mapmaker can be found with MAPMAKERURL');
if (!process.env.HIGHSCOREURL) throw new Error('Please specify where the highscore api can be found with HIGHSCOREURL');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var mmaurl = process.env.MAPMAKERURL;
  var hsaurl = process.env.HIGHSCOREURL;
  
  res.render('game', { controls: req.body.controls, skipWait: req.body.skipWait, mmaurl: mmaurl, hsaurl: hsaurl });
});

module.exports = router;
