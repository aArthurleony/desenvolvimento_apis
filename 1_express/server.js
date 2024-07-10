const express = require("express");
const { v4: uuidv4 } = require("uuid");

const PORT = 3333;
const app = express();

// Middleware para aceitar JSON
app.use(express.json());

// Middleware para log de rotas
const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const rota = `[${method.toUpperCase()}] ${url}`;
  console.log(rota);
  next();
};
app.use(logRoutes);

// Array para armazenar os usuários (simulando um banco de dados)
const users = [];

// Rota para listar todos os usuários
app.get("/users", (request, response) => {
  response.status(200).json(users);
});

// Rota para cadastrar um novo usuário
app.post("/users", (request, response) => {
  const { nome, idade } = request.body;

  // Validações básicas
  if (!nome || !idade) {
    return response
      .status(400)
      .json({ message: "Nome e idade são obrigatórios." });
  }

  const user = {
    id: uuidv4(),
    nome,
    idade,
  };

  users.push(user);
  response.status(201).json({ message: "Usuário cadastrado", user });
});

// Rota para atualizar um usuário pelo ID
app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { nome, idade } = request.body;

  const indexUser = users.findIndex((user) => user.id === id);
  if (indexUser === -1) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }

  if (!nome || !idade) {
    return response
      .status(400)
      .json({ message: "Nome e idade são obrigatórios" });
  }

  users[indexUser] = {
    id,
    nome,
    idade,
  };

  response
    .status(200)
    .json({ message: "Usuário atualizado", user: users[indexUser] });
});

// Rota para atualizar parcialmente um usuário pelo ID
app.patch("/users/:id", (request, response) => {});

// Rota para deletar um usuário pelo ID
app.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  const indexUser = users.findIndex((user) => user.id === id);
  if (indexUser === -1) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }

  users.splice(indexUser, 1);
  response.status(204).send("Usuário deletado");
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor aberto na porta ${PORT}`);
});
