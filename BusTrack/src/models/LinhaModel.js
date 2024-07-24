import conn from "../config/conn.js";

const tableLinha = /*sql*/ `
    CREATE TABLE IF NOT EXISTS Linhas(
    Linha_id VARCHAR(60) PRIMARY KEY NOT NULL,
    nome_linha VARCHAR(255) NOT NULL,
    numero_linha INT NOT NULL,
    itinerario VARCHAR(255) NOT NULL,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
        
)
`;

conn.query(tableLinha, (err, result, field) => {
  if (err) {
    console.error("Erro ao criar a tabela de linhas" + err.stack);
    return;
  }
  console.log("Tabela [ Linhas ] criada com sucesso");
});
