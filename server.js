var express = require('express');
var app = express();
// var ip = require('ip');

// var port1 = ip.address()

const path = require('path');
var rootPath = path.normalize(__dirname + '/dist/HMS')
var port = process.env.PORT || 4200;
app.use(express.static(rootPath));
app.get('*', (req, res) => {
  res.sendFile(rootPath + '/index.html');
});
app.listen(port);
console.log("App listening on port " + port);