const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",      // seu usuário do Workbench
  password: "123@abc",
  database: "xneedware"
});

conn.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

module.exports = conn;
