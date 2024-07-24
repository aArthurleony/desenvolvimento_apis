import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const BuscarLinhas = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM Linhas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as linhas" });
      return;
    }
    const linhas = data;
    response.status(200).json(linhas);
  });
};
export const CadastrarLinha = (request, response) => {
  const { nome_linha, numero_linha, itinerario } = request.body;

  if (!nome_linha) {
    response.status(500).json({ message: "O nome da linha é obrigatorio" });
    return;
  }
  if (!numero_linha) {
    response.status(500).json({ message: "O numero da linha é obrigatorio" });
    return;
  }
  if (!itinerario) {
    response.status(500).json({ message: "O itinerario é obrigatorio" });
    return;
  }
  const checkSQL = /*sql*/ `
    SELECT * FROM Linhas WHERE ?? = ? AND ?? = ? AND ?? = ?
  `;
  const checkSQLData = [
    "nome_linha",
    nome_linha,
    "numero_linha",
    numero_linha,
    "itinerario",
    itinerario,
  ];

  conn.query(checkSQL, checkSQLData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as Linhas" });
      return console.log(err);
    }
    if (data.length > 0) {
      // se for maior que 0 significa que já existe uma linha com essas informações
      response
        .status(409)
        .json({ message: "Linha já cadastrada na base de dados" }); // 409 - deu certo mas não esparava esses dados
      return console.log(err);
    }

    const id = uuidv4(); // passando o id aleatório através do uuid
    const insertSql = /*sql*/ `
    INSERT INTO Linhas(??,??, ??, ??) VALUES (?,?,?,?);
    `;

    const insertData = [
      "Linha_id",
      "nome_linha",
      "numero_linha",
      "itinerario",
      id,
      nome_linha,
      numero_linha,
      itinerario,
    ];

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar a linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "Linha cadastrada" });
    });
  });
};
export const BuscarLinha = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `SELECT * FROM Linhas WHERE ?? = ?`;
  const insertData = ["Linha_id", id];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar a linha" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: "Linha não encontrada" });
      return;
    }
    const linha = data
    response.status(200).json(linha);
  });
};
