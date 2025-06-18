import { Router } from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { validate } from "../middleware/validator.js";

import { ping, pruebaDB, pruebaToken, login, loginT } from "../controllers/auth.controller.js";
import { loginValidationRules, loginTValidationRules } from "../middleware/validator/auth.rules.js";

const router = Router();

// Para hacer ping al servidor
router.get("/ping", ping);

// Para probar la conexión a la base de datos
router.get("/pruebaDB", pruebaDB);

// Para probar el token
router.get("/pruebaToken", authenticateToken, pruebaToken);

// Para hacer login de organizacion o terapeuta (desde React)
router.post("/login", loginValidationRules, validate, login);

// Para hacer login como terapeuta (desde Unity)
router.post("/loginT", loginTValidationRules, validate, loginT);

export default router;
