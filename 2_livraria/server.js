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
  //query para banco
  const sql = /*sql*/ "SELECT * FROM livros";

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os livros" });
      return console.log(err);
    }
    const livros = data;
    console.log(data);
    console.log(typeof data);
    response.status(200).json(livros);
  });
});



app.post("/livros", (request, response) => {
  const { titulo, autor, ano_publicacao, genero, preco } = request.body;
  //validação
  if (!titulo) {
    response.status(400).json({ message: "O título é obrigatório" });
  }
  if (!autor) {
    response.status(400).json({ message: "O autor é obrigatório" });
  }
  if (!ano_publicacao) {
    response.status(400).json({ message: "O ano de publicaçâo é obrigatório" });
  }
  if (!genero) {
    response.status(400).json({ message: "O gênero é obrigatório" });
  }
  if (!preco) {
    response.status(400).json({ message: "O preço é obrigatório" });
  }
  //Cadastrar um livro -> antes preciso saber se esse livro existe
  const checkSQL = /*sql*/ `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os livros" });
      return console.log(err);
    }
    if (data.length > 0) {
      response.status(409).json({ message: "Livro já existe" });
      return console.log(err);
    }
    const id = uuidv4();
    const disponibilidade = 1; // 1(o livro ta disponível)

    const insertSQL = /*sql*/ `INSERT INTO livros
    (id,titulo,autor,ano_publicacao,genero,preco, disponibilidade)
    VALUES
    ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar livro" });
        return console.log(err);
      }
      response.status(201).json({ message: "Livro cadastrado" });
    });
  });
});

// app.get()
// app.put()
// app.delete()
//Rota 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
