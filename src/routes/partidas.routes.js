import { Router } from "express";
import { authenticateToken, authTokenTerapeuta } from "../middleware/authToken.js";
import { validate } from "../middleware/validator.js";

import { getPartidasPaciente, getPartida, createPartida, createFootballGame } from "../controllers/partidas.controller.js";
import {
  getPartidasPacienteValidationRules,
  getPartidaValidationRules,
  createPartidaValidationRules,
} from "../middleware/validator/partidas.rules.js";

const router = Router();

// Para obtener todas las partidas de un paciente
router.get("/partidasP/:idPaciente", authenticateToken, getPartidasPacienteValidationRules, validate, getPartidasPaciente);

// Para obtener una partida en específico
router.get("/partida/:id", authenticateToken, getPartidaValidationRules, validate, getPartida);

// Para crear una partida
router.post("/partida", authTokenTerapeuta, createPartidaValidationRules, validate, createPartida);

router.post("/football", authTokenTerapeuta, validate, createFootballGame)

export default router;
