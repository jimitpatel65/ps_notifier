var express = require('express');
var md2json = require('md-2-json');
var fs = require('fs');
var router = express.Router();

function getHeadValue(obj) {
  return Object.keys(obj).length === 1? Object.keys(obj)[0]: null;
}

function getAlerts(obj) {
  let head = getHeadValue(obj);
  return Object.keys(obj[head]).map((title) => {
    var date = Object.keys(obj[head][title])[0];
    var content = obj[head][title][date].raw || '';
    return {
      title: title,
      date: date,
      content: content,
    }
  })
}

function getAlertObj(obj) {
  return {
      heading: getHeadValue(obj),
      alerts: getAlerts(obj)
  }
}

/* GET alerts listing. */
router.get('/', function(req, res, next) {
  var path = __dirname + '/markdown/hello.md';
  var file = fs.readFileSync(path, 'utf8');
  var alertObj = getAlertObj( md2json.parse((file.toString())));
  res.json(alertObj);
});


module.exports = router;
