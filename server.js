var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app/public')));

app.listen(PORT, function(){
  console.log("App listening on PORT: " + PORT);
});

//grabbing module.exports of routes
require('./app/routes/api-routes.js')(app);
require('./app/routes/html-routes.js')(app,path);