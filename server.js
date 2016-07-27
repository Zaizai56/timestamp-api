var express = require("express");
var moment = require("moment");
var app = express();

app.use('/:url', function(req, res){
  try{
    decodeURIComponent(req.url.substring(0))
  } catch(e){
    console.log("error");
  }
  var reqUrl = req.url.substring(1);
  if(!isNaN(parseFloat(reqUrl))){
    var natural = moment.unix(reqUrl).format("MMM DD,YYYY");
    var unix = reqUrl;
  } else if (moment(decodeURI(reqUrl), "MMM DD,YYYY").isValid()) {
    natural = decodeURI(reqUrl);
    unix = moment(natural,"MMM DD,YYYY").unix();
  } else {
    natural = null;
    unix = null;
  }
  var answer = JSON.stringify({unix: unix,natural: natural});
  res.send(answer);
});

var port = process.env.PORT || 8080; // set our port

app.listen(port, function() {
  console.log('Server listening on ' + port);
});