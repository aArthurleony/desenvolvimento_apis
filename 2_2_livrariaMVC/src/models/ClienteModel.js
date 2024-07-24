import conn from "../config/conn.js";

const tableClientes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes(
        cliente_id varchar(255) primary key,
        nome varchar(255) not null,
        email varchar(255)not null,
        senha varchar(255) not null,
        imagem varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp

    );`;
conn.query(tableClientes, (err, result, field) => {
  if (err) {
    console.error("Erro ao criar a tabela" + err.stack);
    return;
  }
  console.log(result);
  //   console.log(field);
  console.log("Tabela [Clientes] criada com sucesso");
});
