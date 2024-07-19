import "dotenv/config";
import express, { response } from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();

app.use(express.json()); //Depois estudar pra q serve

//Criar conexão com o banco de dados MYSQL
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "funcionarios",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("MYSQL conectado");
});

app.get("/funcionarios", (request, response) => {
  //query para o banco
  const sql = /*sql*/ "SELECT * FROM funcionario";

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os funcionários" });
      return console.log(err);
    }
    const funcionarios = data;
    console.log(data);
    console.log(typeof data);
    response.status(200).json(funcionarios);
  });
});

app.post("/funcionarios", (request, response) => {
  const { nome, cargo, data_contratacao, salario, email } = request.body;

  //validação
  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!cargo) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!data_contratacao) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!salario) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!email) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  //cadastrar um funcionario, antes é preciso saber se ele ja existe
  const checkSQL = /*sql*/ `SELECT * FROM funcionario WHERE email = "${email}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar funcionários" });
      return console.log(err);
    }
    if (data.length > 0) {
      response.status(409).json({ message: "O EMAIL NAO PODE SER REPETIDO" });
      return console.log(err);
    }
    const id = uuidv4();
    const insertSQL = /*sql*/ ` INSERT INTO funcionario (id,nome, cargo, data_contratacao, salario, email)
    VALUES
    ("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar o funcionario" });
        return console.log(err);
      }
      response.status(201).json({ message: "Funcionario cadastrado" });
    });
  });
});

//listar unico funcionario
app.get("/funcionarios/:id", (request, response) => {
  const { id } = request.params;
  const sql = /*sql*/ `SELECT * FROM funcionario WHERE id = "${id}"`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar Funcionario" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Funcionário nao encontrado" });
      return;
    }
    const funcionario = data[0];
    response.status(200).json(funcionario);
  });
});
app.put("/funcionarios/:id", (request, response) => {
  const { id } = request.params;
  const { nome, cargo, data_contratacao, salario, email } = request.body;

  //validação
  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!cargo) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!data_contratacao) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!salario) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }

  const checkSQL = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`;
  conn.query(checkSQL, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao nuscar funcionario" });
    }
    if (data.length === 0) {
      return response
        .status(404)
        .json({ message: "Funcionario nao encontrado" });
    }

    const updateSQL = /*sql*/ `UPDATE funcionarios SET nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}"`;
    conn.query(updateSQL, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: " erro ao atualizar" });
        return;
      }
      response.status(200).json({ message: "sucesso aoa tualziar" });
    });
  });
});
//deletar funcionario
app.delete("/funcionarios/:id", (request, response) => {
  const { id } = request.params;
  const deleteSQL = /*sql*/ `DELETE FROM funcionarios WHERE id = "${id}"`;
  conn.query(deleteSQL, (err, info) => {
    if (err) {
      response.status(500).json({ message: "Erro ao deletar funcionário" });
      return;
    }
    if (info.affectedRows === 0) {
      response.status(404).json({ message: "Funcionário não encontrado" });
      return;
    }
    response
      .status(200)
      .json({ messsage: "O funcionário selecionado foi deletado" });
  });
});
//ROTA 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});
//PORTA
app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
