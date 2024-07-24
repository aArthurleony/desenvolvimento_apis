import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const buscarclientes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM clientes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao Buscar cliente" });
      return;
    }
    response.status(200).json(data);
  });
};
export const cadastrarcliente = (request, response) => {
  const { nome, email, senha, imagem } = request.body;
  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
  }
  if (!email) {
    response.status(400).json({ message: "O email é um campo obrigatório" });
  }
  if (!senha) {
    response.status(400).json({ message: "O senha é um campo obrigatório" });
  }
  if (!imagem) {
    response.status(400).json({ message: "O imagem é um campo obrigatório" });
  }
  const checkEmailSQL = /*sql*/ `SELECT * FROM clientes WHERE ?? = ?`;
  const checkInsertsql = ["email", email];
  conn.query(checkEmailSQL, checkInsertsql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar clientes" });
      return console.log(err);
    }
    if (data.length > 0) {
      response.status(409).json({ message: "O e-mail já está em uso!" });
      return console.error(err);
    }
    const id = uuidv4();
    const sql = /*sql*/ `
    INSERT INTO clientes(??,??,??,??,??)
    VALUES(?,?,?,?,?)
    `;
    const insertData = [
      "cliente_id",
      "nome",
      "senha",
      "email",
      "imagem",
      id,
      nome,
      senha,
      email,
      imagem,
    ];
    conn.query(sql, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ message: "Cadastrar cliente" });
        return;
      }
      response.status(201).json({ message: "cliente cadastrado com sucesso" });
    });
  });
};
export const buscarcliente = (request, response) => {
  const { id } = request.params;
  const sql = /*sql*/ `SELECT * FROM clientes WHERE ?? = ?`;
  const insertData = ["cliente_id", id];

  conn.query(sql,insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao listar clientes" });
      return console.log(err);
    }
    if (clientes.length === 0) {
      response.status(404).json({ message: "cliente nao existe" });
      return;
    }
    const clientes = data;
    response.status(200).json(clientes);
  });
};
export const editarcliente = (request, response) => {
  const { id } = request.params;
  const { nome, email, senha, imagem } = request.body;
  if (!nome) {
    response.status(400).json({ message: "O nome é um campo obrigatório" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O email é um campo obrigatório" });
    return;
  }
  if (!senha) {
    response.status(400).json({ message: "O senha é um campo obrigatório" });
    return;
  }
  const checkSQL = /*sql*/ `SELECT * FROM clientes WHERE id = "${id}"`;
  conn.query(checkSQL, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500).json({ message: "Erro ao buscar dados" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "cliente nao encontrado" });
    }
    const updateSql = /*sql*/ `
      UPDATE clientes 
      SET ?? = ?, ?? = ?, ?? = ?, ?? = ? 
      WHERE ?? = ?;
      `;
      const insertData = [
        "cliente_id",
        id,
        "nome",
        nome,
        "email",
        email,
        "senha",
        senha,
        "imagem",
        imagem,
      ];
      conn.query(updateSql, insertData, (err) => {
        if (err) {
          console.error(err)
          response.status(500).json({ message: "Erro ao atualizar cliente" });
          return 
        }
        response.status(200).json({ message: "dados do cliente atualizado" });
      });

  });
};
export const deletarcliente = (request, response) => {
  const { id } = request.params;

  const deleteSQL = /*sql*/ `DELETE FROM clientes WHERE id = "${id}"`;
  conn.query(deleteSQL, (err, info) => {
    if (err) {
      response.status(500).json({ message: "Erro ao deletar cliente" });
      return;
    }
    if (info.affectedRows === 0) {
      response.status(404).json({ message: "cliente não encontrado" });
      return;
    }
    response.status(200).json({ message: "cliente selecionado foi deletado" });
  });
};

export const rota404 = (request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
};
