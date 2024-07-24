import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getLivros = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM livros`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar Livros" });
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarLivro = (request, response) => {
  const { titulo, autor, ano_publicacao, genero, preco } = request.body;
  if (!titulo) {
    response.status(400).json({ message: "O titulo é um campo obrigatório" });
    return;
  }
  if (!autor) {
    response.status(400).json({ message: "O autor é um campo obrigatório" });
    return;
  }
  if (!ano_publicacao) {
    response
      .status(400)
      .json({ message: "O ano_publicacao é um campo obrigatório" });
    return;
  }
  if (!genero) {
    response.status(400).json({ message: "O genero é um campo obrigatório" });
    return;
  }
  if (!preco) {
    response.status(400).json({ message: "O preco é um campo obrigatório" });
    return;
  }

  // Verificar se o livro já existe
  const checkSQL = /*sql*/ `SELECT * FROM livros
  WHERE ?? = ? AND ?? = ? AND ?? = ?`;
  const checkSQLdata = [
    "titulo",
    titulo,
    "autor",
    autor,
    "ano_publicacao",
    ano_publicacao,
  ];
  conn.query(checkSQL, checkSQLdata, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os livros" });
      return;
    }

    if (data.length > 0) {
      response.status(409).json({ message: "Livro já existe" });
      return;
    }

    const id = uuidv4();
    const disponibilidade = 1; // 1 = livro disponível

    const insertSQL = /*sql*/ `INSERT INTO livros (??,??,??,??,??,??,??)
    VALUES (?,?,?,?,?,?,?)`;

    const insertData = [
      "livro_id",
      "titulo",
      "autor",
      "ano_publicacao",
      "genero",
      "preco",
      "disponibilidade",
      id,
      titulo,
      autor,
      ano_publicacao,
      genero,
      preco,
      disponibilidade,
    ];

    conn.query(insertSQL, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar livro" });
        return console.log(err);
      }
      response.status(201).json({ message: "Livro cadastrado" });
    });
  });
};

export const buscarlivro = (request, response) => {
  const { id } = request.params;
  const sql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`;
  const checkData = ["livro_id", id];

  conn.query(sql, checkData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar o livro" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    const livro = data[0];
    response.status(200).json(livro);
  });
};

export const editarlivro = (request, response) => {
  const { id } = request.params;
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } =
    request.body;
  // Validações
  if (!titulo) {
    response.status(400).json({ message: "O titulo é um campo obrigatório" });
    return;
  }
  if (!autor) {
    response.status(400).json({ message: "O autor é um campo obrigatório" });
    return;
  }
  if (!ano_publicacao) {
    response
      .status(400)
      .json({ message: "O ano_publicacao é um campo obrigatório" });
    return;
  }
  if (!genero) {
    response.status(400).json({ message: "O genero é um campo obrigatório" });
    return;
  }
  if (!preco) {
    response.status(400).json({ message: "O preco é um campo obrigatório" });
    return;
  }
  if (disponibilidade === undefined) {
    response
      .status(400)
      .json({ message: "O disponibilidade é um campo obrigatório" });
    return;
  }

  const checkSQL = /*sql*/ `SELECT * FROM livros WHERE ?? = ? AND ?? = ? AND ?? = ?`;
  const checkSQLdata = [
    "livro_id",
    id,
    "titulo",
    titulo,
    "autor",
    autor,
    "ano_publicacao",
    ano_publicacao,
  ];
  conn.query(checkSQL, checkSQLdata, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar o livro" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const updateSQL = /*sql*/ `UPDATE livros SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    conn.query(updateSQL, checkUPDATEsql, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao atualizar o livro" });
        return;
      }
      response.status(200).json({ message: "Livro atualizado" });
    });
  });
};

export const deletarlivro = (request, response) => {
  const { id } = request.params;

  const deletesql = /*sql*/ `DELETE * FROM livros where ?? = ?`;
  const insertData = ["livro_id", id];

  conn.query(deletesql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar o livro" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    response.status(200).json({ message: "Livro removido" });
  });
};
