import "dotenv/config";
import express, { response } from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

//criar conexão com o banco de dados MYSQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "livraria",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("MySQL Conectado");
});
app.get("/livros", (request, response) => {
  response.send("Olá, mundo!");
});

//Rota 404
app.use((request, response) => {
    response.status(404).json({message: "Rota não encontrada"})
});

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
