import "dotenv/config";
import express from "express";
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
  database: "funcionarios",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("MySQL Conectado");
});

//listar todos os livros
app.get("/funcionarios", (request, response) => {
  const SQL = /*sql*/ "SELECT * FROM funcionario";
  conn.query(SQL, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar os funcionários" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Funcionario não encontrado" });
      return;
    }
    const funcionarios = data;
    response.status(200).json(funcionarios);
  });
});
app.post("/funcionarios", (request, response) => {
  const { nome, cargo, data_contratacao, salario, email } = request.body;
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
  if (!email.includes("@")) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  const checkEmailSQL = /*sql*/ `SELECT * FROM funcionario WHERE email = "${email}"`;
  conn.query(checkEmailSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar funcionários" });
      return console.log(err);
    }
    if (data.length > 0) {
      response.status(409).json({ message: "O e-mail já está em uso!" });
      return console.error(err);
    }
    const id = uuidv4();
    const insertSQL = /*sql*/ ` INSERT INTO funcionario (id,nome, cargo, data_contratacao, salario, email)
    VALUES
    ("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}")`;
    conn.query(insertSQL, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Cadastrar funcionário" });
        return;
      }
      response
        .status(201)
        .json({ message: "Funcionario cadastrado com sucesso" });
    });
  });
});
app.get("/funcionarios/:id", (request, response) => {
  const { id } = request.params;
  const SQL = /*sql*/ `SELECT * FROM funcionario WHERE id = "${id}"`;

  conn.query(SQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao listar funcionários" });
      return console.log(err);
    }
    const funcionarios = data;
    if (funcionarios.length === 0) {
      response
        .status(404)
        .json({ message: "Nao existe funcionários cadastrados" });
      return;
    }
    response.status(200).json(funcionarios);
  });
});
app.put("/funcionarios/:id", (request, response) => {
  const id = request.params;
  const { nome, cargo, data_contratacao, salario, email } = request.body;

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
  if (!email.includes("@")) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  const checkSQL = /*sql*/ `SELECT * FROM funcionario WHERE id = "${id}"`;
  conn.query(checkSQL, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ message: "Erro ao buscar dados" });
      return;
    }
    if (data === 0) {
      response.status(404).json({ message: "Funcionario nao encontrado" });
      return;
    }
    const emailCheckSQL = /*sql*/ `SELECT * FROM funcionario WHERE email = "${email}" AND id != "${id}"`;
    conn.query(emailCheckSQL, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Erro ao verificar os emails" });
        return;
      }
      if (data.length > 0) {
        return response.status(409).json({ message: "O email ja está em uso" });
      }
      const updateSQL = /*sql*/ `UPDATE funcionario SET nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}"`;
      conn.query(updateSQL, (err) => {
        if (err) {
          console.error(err);
          return response
            .status(500)
            .json({ message: "Erro ao atualizar funcionário" });
        }
        response
          .status(200)
          .json({ message: "dados do funcionario atualizado" });
      });
    });
  });
});
app.delete("/livros/:id", (request, response) => {});

/*************************rotas de funcionários*****************************/
/*id, nome, cargo, data_contratacao, salario, email, created_at, updated_at */
//Rota 01 -> Lista todos
//Rota 02 -> Cadastra funcionario (único email por funcionário)
//Rota 03 -> Lista UM (1) funcionario
//Rota 04 -> Atualiza UM (1) funcionario
//Rota 05 -> deleta UM (1) funcionario

//Rota 404
app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});
process.on("SIGINT", () => {
  conn.end((err) => {
    if (err) {
      console.error(`Erro ao fechar a conexão ${err.message}`);
    }
    console.log("Conexão como MYSQL encerrada");
    process.exit();
  });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
