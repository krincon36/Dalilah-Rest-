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
