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

//listar todos os livros
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
  const checkSQL = /*sql*/ `SELECT * FROM livros
  WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;

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

//listar um livro
app.get("/livros/:id", (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `SELECT * FROM livros WHERE id = "${id}"`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar livro" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    const livro = data[0];
    response.status(200).json(livro);
  });
});

app.put("/livros/:id", (request, response) => {
  const { id } = request.params;
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } =
    request.body;

  //validações
  if (!titulo) {
    response.status(400).json({ message: "O título é obrigatório" });
    return;
  }
  if (!autor) {
    response.status(400).json({ message: "O autor é obrigatório" });
    return;
  }
  if (!ano_publicacao) {
    response.status(400).json({ message: "O ano de publicaçâo é obrigatório" });
    return;
  }
  if (!genero) {
    response.status(400).json({ message: "O gênero é obrigatório" });
    return;
  }
  if (!preco) {
    response.status(400).json({ message: "O preço é obrigatório" });
    return;
  }
  if (disponibilidade === undefined) {
    response.status(400).json({ message: "A disponibilidade é obrigatória" });
    return;
  }

  const checkSQL = /*sql*/ `SELECT * FROM livros WHERE id = "${id}"`;
  conn.query(checkSQL, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar livros" });
    }
    if (data.length === 0) {
      return response.status(404).json({ message: "Livro não encontrado" });
    }

    //consukta SQL para atualizar livro
    const updateSQL = /*sql*/ `UPDATE livros SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}" WHERE id = "${id}"`;

    conn.query(updateSQL, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Erro ao atualizar livro" });
        return;
      }
      response.status(200).json({ message: "Livro atualizado" });
    });
  });
});
app.delete("/livros/:id", (request, response) => {
  const { id } = request.params;

  const deleteSQL = /*sql*/ `DELETE FROM livros WHERE id = "${id}"`;
  conn.query(deleteSQL, (err, info) => {
    if (err) {
      response.status(500).json({ message: "Erro ao deletar livro" });
      return;
    }
    if (info.affectedRows === 0) {
      response.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    response.status(200).json({ message: "Livro selecionado foi deletado" });
  });
});

/*************************rotas de funcionários*****************************/
/*id, nome, cargo, data_contratacao, salario, email, created_at, updated_at */
//Rota 01 -> Lista todos ok
//Rota 02 -> Cadastra funcionario (único email por funcionário) ok
//Rota 03 -> Lista UM (1) funcionario ok
//Rota 04 -> Atualiza UM (1) funcionario
//Rota 05 -> deleta UM (1) funcionario

//Rota 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
