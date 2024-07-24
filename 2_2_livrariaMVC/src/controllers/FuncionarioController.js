import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarFuncionarios = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM funcionarios`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao Buscar Livros" });
      return;
    }
    response.status(200).json(data);
  });
};
export const cadastrarFuncionario = (request, response) => {
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
  if (!email) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  const checkEmailSQL = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}"`;
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
    const insertSQL = /*sql*/ ` INSERT INTO funcionarios (id,nome, cargo, data_contratacao, salario, email)
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
};
export const buscarFuncionario = (request, response) => {
  const { id } = request.params;
  const SQL = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`;

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
};
export const editarFuncionario = (request, response) => {
  const { id } = request.params;
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
  const checkSQL = /*sql*/ `SELECT * FROM funcionarios WHERE id = "${id}"`;
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
    const emailCheckSQL = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}" AND id != "${id}"`;
    conn.query(emailCheckSQL, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Erro ao verificar os emails" });
        return;
      }
      if (data.length > 0) {
        return response.status(409).json({ message: "O email ja está em uso" });
      }
      const updateSQL = /*sql*/ `UPDATE funcionarios SET nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}"`;
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
};
export const deletarFuncionario = (request, response) => {
  const { id } = request.params;

  const deleteSQL = /*sql*/ `DELETE FROM funcionarios WHERE id = "${id}"`;
  conn.query(deleteSQL, (err, info) => {
    if (err) {
      response.status(500).json({ message: "Erro ao deletar funcionario" });
      return;
    }
    if (info.affectedRows === 0) {
      response.status(404).json({ message: "funcionario não encontrado" });
      return;
    }
    response
      .status(200)
      .json({ message: "funcionario selecionado foi deletado" });
  });
};

export const rota404 = (request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
};
