# Delilah Restó
Is a Backend that enable orderin for menu in the restaurant. REST API that execute CRUD Operations on based in data structure
Getting Started
Through this instructions allow it copy project and running in desktop and testing
## Prerequisites
For  you can installing you need before,  next things:
. GIT
. Tarea DB
. A database manager as MySql
. Node.js
## Installing 
1. Copy (or clone) the repository to your local machine.
2. Add a file to your local repository and commit the changes.
3. Push the changes to the main branch.
4. You run the database manager for create the database, creating initial data for execute project
5. You install dependencies, open cmd and write command npm
install npm --save
6. You run the server and you write node xxx.js (name of project) and it start 
Note: of the port is 3000 for run the project in your computer

## Tools Programing
. Javascript
. Node.js
. MySql
. Tarea  db

## Developers

- **Kimberly Rincon** - [krincon36](https://github.com/krincon36) 
- **Andres David Solarte** - [andresdavidsv](https://github.com/andresdavidsv)

## Connection to the database

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

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "dev02",
  password: "Best042021@",
  database: "tarea"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


function getUsuarioHeaderData(req) {
  usuarioemail = req.headers["usuarioemail"];
  usuariorol = req.headers["usuariorol"];
  console.log(usuarioemail);
  console.log(usuariorol);
}

// Defining get request at '/multiple' route
app.get('/GetUsuario/:email', function (req, res) {
  var result = "Hello World"; // my .ejs see's this
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden consultar usuarios
    connection.query("SELECT * FROM usuario where email='" + req.params.email + "'",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows); // query result looks fine as JSON object
        result = rows; // now change "Hello World" to the JSON object
        res.json(rows);
      }
    );
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

app.post('/PostUsuario', function (req, res) {
  console.log(req.headers["secret"]);
  console.log(req.body);
  console.log(req.body.email);
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden crear usuarios
    sql = "insert into usuario(email,password,rol) values('" + req.body.email + "','" + req.body.password + "','" + req.body.rol + "');",
      connection.query(sql, function (err, result) {
        if (err) {
          sql = "update usuario set password = '" + req.body.password + "',rol='" + req.body.rol + "' where email='" + req.body.email + "';",
            connection.query(sql, function (err, result) {
              if (err) {
                console.log(err);
              }
              else {
                console.log("1 record updated");
                res.json([{ "resultado": "ok" }]);
              }
            });
        }
        else {
          console.log("1 record inserted");
          res.json([{ "id": result.insertId }]);
        }

      });
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

