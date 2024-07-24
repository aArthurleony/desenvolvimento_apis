import { Router } from "express";
import {
  cadastrarLivro,
  getLivros,
  buscarlivro,
  editarlivro,
  deletarlivro,
} from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);
router.post("/criar", cadastrarLivro);
router.get("/:id", buscarlivro);
router.put("/editar/:id", editarlivro);
router.delete("/remover/:id", deletarlivro);

export default router;
