import "dotenv/config";
import express from "express";

// Conexão com banco de dados
import conn from "./config/conn.js";

// Importação dos módulos e criação das tabelas
import "./models/livroModel.js";
import "./models/FuncionarioModel.js";
import "./models/ClienteModel.js";
// import "./models/EmprestimoModel.js";

import livrosRoutes from "./routes/livroRoutes.js";
import FuncionarioRoutes from "./routes/FuncionariosRoutes.js";
import clienteRoutes from "./routes/ClienteRoutes.js";
// import EmprestimoRoutes from "./routes/EmprestimoRoutes.js"

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Utilização das rotas
app.use("/livros", livrosRoutes);
app.use("/funcionarios", FuncionarioRoutes);
app.use("/clientes", clienteRoutes);
// app.use('/Emprestimo', EmprestimoRoutes);

app.get("/", (request, response) => {
  response.send("vc só colocou " / " ");
});

app.listen(PORT, () => {
  console.log(`Servidor on PORT ${PORT}`);
});
