const express = require('express');
const bodyParser = require("body-parser");
const app = express();

var usuarioemail = "";
var usuariorol = "";

// Defining get request at '/' route
app.get('/', function (req, res) {
  res.json({
    number: 1
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
