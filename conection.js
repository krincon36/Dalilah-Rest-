var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "webservice.southcentralus.cloudapp.azure.com",
    user: "root",
    password: "Genio042019@",
    database:"tarea"
  });

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
  