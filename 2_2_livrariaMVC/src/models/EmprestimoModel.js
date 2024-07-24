// import conn from "../config/conn.js";

// const tableEmprestimos = /*sql*/ `
//     CREATE TABLE  IF NOT EXISTS Emprestimos  (
//         id INT AUTO_INCREMENT not null,
//         cliente_id varchar(255) not null,
//         livro_id varchar(255) not null,
//         data_emprestimo date not null,
//         data_devolucao date not null,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

//     )
// `;
// conn.query(tableEmprestimos, (err, result, field) => {
//   if (err) {
//     console.error("Erro ao criar a tabela" + err.stack);
//     return;
//   }
//   console.log("Tabela [emprestimo] criada com sucesso");
// });
