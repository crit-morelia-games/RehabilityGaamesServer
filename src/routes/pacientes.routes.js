import { Router } from "express";
import { authenticateToken, authTokenTerapeuta, authTokenOrganizacion } from "../middleware/authToken.js";
import { validate } from "../middleware/validator.js";

import {
  getAllPacientes,
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
  changeTerapeuta,
} from "../controllers/pacientes.controller.js";
import {
  getPacientesValidationRules,
  getPacienteValidationRules,
  createPacienteValidationRules,
  updatePacienteValidationRules,
  deletePacienteValidationRules,
  changeTerapeutaValidationRules,
} from "../middleware/validator/pacientes.rules.js";

const router = Router();

// Para ver todos los pacientes de una organizacion
router.get("/pacientes", authTokenOrganizacion, getAllPacientes);

// Para ver todos los pacientes de un terapeuta
router.get("/pacientesT/:idTerapeuta", authenticateToken, getPacientesValidationRules, validate, getPacientes);

// Para ver un paciente en especifico
router.get("/paciente/:idPaciente", authenticateToken, getPacienteValidationRules, validate, getPaciente);

// Para crear un paciente (como terapeuta)
router.post("/paciente", authTokenTerapeuta, createPacienteValidationRules, validate, createPaciente);

// Para editar un paciente en especifico
router.put("/paciente/:idPaciente", authenticateToken, updatePacienteValidationRules, validate, updatePaciente);

// Para eliminar un paciente en especifico
router.delete("/paciente/:idPaciente", authenticateToken, deletePacienteValidationRules, validate, deletePaciente);

// Para cambiar el terapeuta de un paciente (organizacion)
router.put(
  "/paciente/:idPaciente/:idNewTerapeuta",
  authTokenOrganizacion,
  changeTerapeutaValidationRules,
  validate,
  changeTerapeuta
);

export default router;
