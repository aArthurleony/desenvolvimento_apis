import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "livrariaMVC",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("MYSQL conectado");
});

export default conn;
