// import conn from "../config/conn.js";

// export const ListarEmprestimos = (request, response) => {
//   const sql = /*sql*/ `SELECT * FROM Emprestimos`;
//   conn.query(sql, (err, data) => {
//     if (err) {
//       console.error(err);
//       response.status(500).json({ msg: "Erro ao listar os emprestimos" });
//       return;
//     }
//     response.status(200).json(data);
//   });
// }