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
