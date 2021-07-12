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
