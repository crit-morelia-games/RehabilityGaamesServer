import { Router } from "express";
import { validate } from "../middleware/validator.js";

import { registerOrganizacion } from "../controllers/organizaciones.controller.js";
import { createOrganizacionValidationRules } from "../middleware/validator/organizaciones.rules.js";

const router = Router();

// Funcion para crear una organizacion (es como un register)
router.post("/organizacion", createOrganizacionValidationRules, validate, registerOrganizacion);

export default router;
