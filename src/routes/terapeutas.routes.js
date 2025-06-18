import { Router } from "express";
import { authTokenOrganizacion, authenticateToken } from "../middleware/authToken.js";
import { validate } from "../middleware/validator.js";

import {
  createTerapeuta,
  getTerapeutas,
  getTerapeuta,
  updateTerapeuta,
  deleteTerapeuta,
} from "../controllers/terapeutas.controller.js";
import {
  createTerapeutaValidationRules,
  getTerapeutaValidationRules,
  updateTerapeutaValidationRules,
  deteleTerapeutaValidationRules,
} from "../middleware/validator/terapeutas.rules.js";

const router = Router();

// Para crear un terapeuta desde una organiacion
router.post("/terapeuta", authTokenOrganizacion, createTerapeutaValidationRules, validate, createTerapeuta);

// Para ver los terapeutas de una organizacion
router.get("/terapeutas", authTokenOrganizacion, getTerapeutas);

// Para ver un terapeuta en especifico
router.get("/terapeuta/:id", authTokenOrganizacion, getTerapeutaValidationRules, validate, getTerapeuta);

// Para editar un terapeuta en especifico (como terapeuta u organizacion)
router.put("/terapeuta/:id", authenticateToken, updateTerapeutaValidationRules, validate, updateTerapeuta);

// Para "eliminar" un terapeuta en especifico (como organizacion)
router.delete("/terapeuta/:id", authTokenOrganizacion, deteleTerapeutaValidationRules, validate, deleteTerapeuta);

export default router;
