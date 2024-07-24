import { Router } from "express";
import {
  cadastrarcliente,
  buscarcliente,
  deletarcliente,
  buscarclientes,
  editarcliente,
} from "../controllers/ClienteController.js";

const router = Router();

router.get("/", buscarclientes);
router.post("/criar", cadastrarcliente);
router.get("/:id", buscarcliente);
router.put("editar/:id", editarcliente);
router.delete("/remover/:id", deletarcliente);

export default router;
