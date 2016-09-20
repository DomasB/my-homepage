var express = require('express');
var router = express.Router();
var fs = require("fs");

var contents = fs.readFileSync("views/lang.json");
var lang = JSON.parse(contents);
/* GET home page. */
router.get('/', function(req, res) {
  var contents = fs.readFileSync("views/lang.json");
  var lang = JSON.parse(contents);
  res.render('layouts/main', lang.lt);
});

router.get('/en', function(req, res) {
  var contents = fs.readFileSync("views/lang.json");
  var lang = JSON.parse(contents);
  res.render('layouts/main', lang.en);
});
router.get('/herbai', function(req, res) {
  res.render('layouts/herbai');
});

module.exports = router;
