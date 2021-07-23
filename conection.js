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
