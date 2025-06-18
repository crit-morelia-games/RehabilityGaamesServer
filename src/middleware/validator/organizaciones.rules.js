import { body } from "express-validator";

export const createOrganizacionValidationRules = [
  body("organizacion").notEmpty().withMessage("La organización es requerida"),
  body("organizacion").trim(),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("direccion").notEmpty().withMessage("La dirección es requerida"),
  body("direccion").trim(),
  body("telefono").notEmpty().withMessage("El telefono es requerido"),
  body("telefono").isLength({ min: 10, max: 10 }).withMessage("El telefono debe tener 10 dígitos"),
];
