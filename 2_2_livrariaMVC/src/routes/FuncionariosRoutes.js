import { Router } from "express";
import {
  cadastrarFuncionario,
  buscarFuncionario,
  deletarFuncionario,
  buscarFuncionarios,
  editarFuncionario,
} from "../controllers/FuncionarioController.js";

const router = Router();

router.get("/", buscarFuncionarios);
router.post("/criar", cadastrarFuncionario);
router.get("/:id", buscarFuncionario);
router.put("editar/:id", editarFuncionario);
router.delete("/remover/:id", deletarFuncionario);

export default router;
