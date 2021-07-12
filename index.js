const express = require('express');
const bodyParser = require("body-parser");
const app = express();
  
// Defining get request at '/' route
app.get('/', function(req, res) {
  res.json({
    number: 1
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
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
  

// Defining get request at '/multiple' route
app.get('/GetUsuario/:email', function(req, res) {    
    var result = "Hello World"; // my .ejs see's this

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
 
});

app.post('/PostUsuario', function(req, res) {
  console.log(req.headers["secret"]);
  console.log(req.body);
  console.log(req.body.email);
  sql= "insert into usuario(email,password,rol) values('"+req.body.email+"','"+req.body.password+"','"+req.body.rol+"');",
  connection.query(sql, function (err, result) {  
    if (err) 
    {
        sql= "update usuario set password = '"+req.body.password+"',rol='"+req.body.rol+"' where email='"+req.body.email+"';",
        connection.query(sql, function (err, result) {  
        if (err) 
        {
          console.log( err);}
        else{
          console.log("1 record updated");  
          res.json([{"resultado":"ok"}]);
        }      
        });
    }
    else{
      console.log("1 record inserted");  
      res.json([{"id":result.insertId}]);
    }  
    
    });  

      
  
});


// Defining get request at '/multiple' route
app.get('/GetProducto/:codigo', function(req, res) {    
  var result = "Hello World"; // my .ejs see's this

  connection.query("SELECT * FROM producto where codigo='" + req.params.codigo + "'",
  function (err, rows) {
      if (err) {
      console.log(err);
      }      
      console.log(rows); // query result looks fine as JSON object
      result = rows; // now change "Hello World" to the JSON object
      res.json(rows);
  }
);

});

app.post('/PostProducto', function(req, res) {
  
  sql= "insert into producto(codigo,nombre,precio) values('"+req.body.codigo+"','"+req.body.nombre+"','"+req.body.precio+"');",
  connection.query(sql, function (err, result) {  
    if (err) 
    {
        sql= "update producto set nombre = '"+req.body.nombre+"',precio='"+req.body.precio+"' where codigo='"+req.body.codigo+"';",
        connection.query(sql, function (err, result) {  
        if (err) 
        {
          console.log( err);}
        else{
          console.log("1 record updated");  
          res.json([{"resultado":"ok"}]);
        }          
        });  
    }
    else{
      console.log("1 record inserted");  
      res.json([{"id":result.insertId}]);
    }  

    });  

    
  
});
  

app.post('/PostPedido', function(req, res) {
  var procesado = 0;
  sql= "insert into pedido(nombrecliente) values('"+req.body.nombrecliente+"');",
  connection.query(sql, function (err, result) {  
    if (err) 
    {
      console.log(err);  
      res.json([{"resultado":"nada que actualizar"}]);      
    }
    else{
      console.log("1 record inserted");  
      res.json([{"id":result.insertId}]);      
    }  
  });  
  
});

app.post('/PostPedidoItem', function(req, res) {
  var procesado = 0;
  sql= "insert into pedidoitem(pedidoid,productoid,cantidad) values('"+req.body.pedidoid+"','"+req.body.productoid+"','"+req.body.cantidad+"');",
  connection.query(sql, function (err, result) {  
    if (err) 
    {
      console.log(err);  
      res.json([{"resultado":"nada que actualizar"}]);    
    }
    else{
      console.log("1 record inserted");  
      res.json([{"id":result.insertId}]);      
    }  
  });    
});


app.put('/PutPedidoItem', function(req, res) {
  var procesado = 0;
  sql= "update pedidoitem set productoid='"+req.body.productoid+"',cantidad='"+req.body.cantidad+"' where id='"+req.body.id+"';",
  connection.query(sql, function (err, result) {  
    if (err) 
    {
      console.log(err);  
      res.json([{"resultado":"nada que ejecutar"}]);    
    }
    else{
      console.log("1 record updated");  
      res.json([{"id":result.insertId}]);      
    }  
  });    
});

app.get('/GetPedidoItems/:pedidoid', function(req, res) {    
  var result = "Hello World"; // my .ejs see's this

  connection.query("SELECT * FROM pedidoitem where pedidoid='" + req.params.pedidoid + "'",
  function (err, rows) {
      if (err) {
      console.log(err);
      }      
      console.log(rows); // query result looks fine as JSON object
      result = rows; // now change "Hello World" to the JSON object
      res.json(rows);
  }
);

});
  
// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
  console.log("Server is running at port 3000");
});