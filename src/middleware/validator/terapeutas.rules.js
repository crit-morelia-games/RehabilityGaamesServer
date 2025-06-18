import { body, param } from "express-validator";
import { prisma } from "../../utils/db.js";

export const createTerapeutaValidationRules = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("nombre").trim(),
  body("aPaterno").notEmpty().withMessage("Los apellidos son requeridos"),
  body("aPaterno").isAlpha().withMessage("Los apellidos no pueden contener numeros y/o caracteres especiales"),
  body("aPateno").trim(),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("telefono").notEmpty().withMessage("El telefono es requerido"),
  body("telefono").isLength({ min: 10, max: 10 }).withMessage("El telefono debe tener 10 dígitos"),
];

export const getTerapeutaValidationRules = [
  param("id").isNumeric().withMessage("El id del terapeuta debe ser un número"),
  param("id").custom(async (value, { req }) => {
    await terapeutaExists(value, req);
  }),
];

export const updateTerapeutaValidationRules = [
  param("id").isNumeric().withMessage("El id del terapeuta debe ser un número"),
  param("id").custom(async (value, { req }) => {
    await terapeutaExists(value, req);
  }),
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("nombre").trim(),
  body("aPaterno").notEmpty().withMessage("Los apellidos son requeridos"),
  body("aPaterno").isAlpha().withMessage("Los apellidos no pueden contener numeros y/o caracteres especiales"),
  body("aPateno").trim(),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("El email no es válido"),
  body("telefono").notEmpty().withMessage("El telefono es requerido"),
  body("telefono").isLength({ min: 10, max: 10 }).withMessage("El telefono debe tener 10 dígitos"),
];

export const deteleTerapeutaValidationRules = [
  param("id").isNumeric().withMessage("El id del terapeuta debe ser un número"),
  param("id").custom(async (value, { req }) => {
    await terapeutaExists(value, req);
  }),
  param("id").custom(async (value) => {
    const pacientes = await prisma.paciente.findMany({
      where: {
        idTerapeuta: parseInt(value),
        isActive: true,
      },
    });

    if (pacientes.length > 0) {
      throw new Error("El terapeuta tiene pacientes asignados, por favor reasignelos antes de eliminarlo");
    }
  }),
];

const terapeutaExists = async (value, req) => {
  const terapeutaExistente = await prisma.terapeuta.findUnique({
    where: {
      id: parseInt(value),
    },
  });

  if (terapeutaExistente == null) {
    throw new Error("El terapeuta no existe");
  } else if (terapeutaExistente.isActive === false) {
    throw new Error("El terapeuta fue eliminado");
  }

  if (req.user.tipo === "organizacion" && terapeutaExistente.idOrganizacion !== req.user.id) {
    throw new Error("Terapeuta de otra organizacion");
  }
};
