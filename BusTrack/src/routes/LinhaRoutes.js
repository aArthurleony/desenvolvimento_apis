import { Router } from "express";

import {
  BuscarLinhas,
  CadastrarLinha,
  BuscarLinha,
} from "../controllers/LinhaController.js";

const router = Router();

router.get("/", BuscarLinhas);
router.post("/CadastrarLinha", CadastrarLinha);
router.get("/BuscarLinha/:id", BuscarLinha);

export default router;
