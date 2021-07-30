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


// Defining get request at '/multiple' route
app.get('/GetProducto/:codigo', function (req, res) {
  var result = "Hello World"; // my .ejs see's this
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden consultar productos
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
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

// Defining get request at '/multiple' route
app.delete('/DeleteProducto/:codigo', function (req, res) {
  var result = "Hello World"; // my .ejs see's this
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden borrar productos
    connection.query("delete from pedidoitem where productoid in (SELECT id FROM producto where codigo='" + req.params.codigo + "')",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
      }
    );
    connection.query("delete from producto where codigo='" + req.params.codigo + "'",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
        res.json(rows);
      }
    );
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

app.post('/PostProducto', function (req, res) {
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden crear productos
    sql = "insert into producto(codigo,nombre,precio) values('" + req.body.codigo + "','" + req.body.nombre + "','" + req.body.precio + "');",
      connection.query(sql, function (err, result) {
        if (err) {
          sql = "update producto set nombre = '" + req.body.nombre + "',precio='" + req.body.precio + "' where codigo='" + req.body.codigo + "';",
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

app.post('/PostPedido', function (req, res) {
  getUsuarioHeaderData(req);
  var procesado = 0;
  if (usuariorol == "VENDEDOR") {//Solo los vendedores pueden crear pedidos
    sql = "insert into pedido(nombrecliente) values('" + req.body.nombrecliente + "');",
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
          res.json([{ "resultado": "nada que actualizar" }]);
        }
        else {
          console.log("1 record inserted");
          res.json([{ "id": result.insertId }]);
        }
      });
  }
  else {
    console.log("NO ES VENDEDOR");
    res.json([{ "id": 0, "ERROR": "NO ES VENDEDOR" }]);
  }
});

app.post('/PostPedidoItem', function (req, res) {
  var procesado = 0;
  getUsuarioHeaderData(req);
  if (usuariorol == "VENDEDOR") {//Solo los vendedores pueden crear pedidos
    sql = "insert into pedidoitem(pedidoid,productoid,cantidad) values('" + req.body.pedidoid + "','" + req.body.productoid + "','" + req.body.cantidad + "');",
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
          res.json([{ "resultado": "nada que actualizar" }]);
        }
        else {
          console.log("1 record inserted");
          res.json([{ "id": result.insertId }]);
        }
      });
  }
  else {
    console.log("NO ES VENDEDOR");
    res.json([{ "id": 0, "ERROR": "NO ES VENDEDOR" }]);
  }
});

app.put('/PutPedidoItem', function (req, res) {
  var procesado = 0;
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden actualizar
    sql = "update pedidoitem set productoid='" + req.body.productoid + "',cantidad='" + req.body.cantidad + "' where id='" + req.body.id + "';",
      connection.query(sql, function (err, result) {
        if (err) {
          console.log(err);
          res.json([{ "resultado": "nada que ejecutar" }]);
        }
        else {
          console.log("1 record updated");
          res.json([{ "id": result.insertId }]);

        }
      });
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

app.delete('/DeletePedido/:id', function (req, res) {
  var result = "";
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") {//solo los admin pueden borrar pedidos    
    connection.query("delete from pedidoitem where pedidoid = " + req.params.id + "",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
      }
    );
    connection.query("delete from pedido where id=" + req.params.id + "",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
        res.json(rows);
      }
    );
  }
  else {
    console.log("NO ES ADMIN");
    res.json([{ "id": 0, "ERROR": "NO ES ADMIN" }]);
  }
});

app.get('/GetPedidoItems/:pedidoid', function (req, res) {
  var result = "";
  getUsuarioHeaderData(req);
  if (usuariorol == "ADMIN") { //el rol admin puede consultar todos los pedidos
    connection.query("SELECT * FROM pedidoitem where pedidoid='" + req.params.pedidoid + "'",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
        res.json(rows);
      }
    );
  }
  else {//solo puede consultar pedidos creados por el mismo usuario si no es admin
    connection.query("SELECT * FROM pedidoitem where pedidoid='" + req.params.pedidoid + "' and pedidoid in (select id from pedido where usuarioemailcreador='" + usuarioemail + "')",
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log(rows);
        result = rows;
        res.json(rows);
      }
    );
  }
});

// Setting the server to listen at port 3000
app.listen(3000, function (req, res) {
  console.log("Server is running at port 3000");
});
