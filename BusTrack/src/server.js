import "dotenv/config";
import express from "express";

//conexão com o banco de dados
import conn from "./config/conn.js";

//models
import "./models/LinhaModel.js";

//rotas
import LinhaRoutes from "./routes/LinhaRoutes.js";

const PORT = process.env.PORT // Adiciona um valor padrão caso a variável de ambiente não seja definida
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//utilização das rotas
app.use("/Linhas", LinhaRoutes);

app.get("/", (request, response) => {
    response.send("Olá mundo");
});

app.listen(PORT, () => {
    console.log("Servidor aberto na porta: " + PORT);
});
