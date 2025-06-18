import { body, param } from "express-validator";
import { prisma } from "../../utils/db.js";

export const getPacientesValidationRules = [
  param("idTerapeuta").isInt().withMessage("El id debe ser un numero entero"),
  param("idTerapeuta").custom(async (value, { req }) => {
    const terapeutaExistente = await prisma.terapeuta.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (terapeutaExistente == null) {
      throw new Error("El terapeuta no existe");
    }

    if (req.user.tipo === "organizacion" && terapeutaExistente.idOrganizacion !== req.user.id) {
      throw new Error("No puedes ver los pacientes de otra organizacion");
    } else if (req.user.tipo === "terapeuta" && terapeutaExistente.id != req.user.id) {
      throw new Error("No puedes ver los pacientes de otro terapeuta");
    }
  }),
];

export const getPacienteValidationRules = [
  param("idPaciente").isInt().withMessage("El id debe ser un numero entero"),
  param("idPaciente").custom(async (value, { req }) => {
    await validatePacienteOwner(value, req);
  }),
];

export const createPacienteValidationRules = [
  body("id").isInt().withMessage("El id debe ser un numero entero"),
  body("nombre").isString().withMessage("El nombre debe ser una cadena de caracteres"),
  body("aPaterno").isString().withMessage("El apellido paterno debe ser una cadena de caracteres"),
  body("diagnostico").isString().withMessage("El diagnostico debe ser una cadena de caracteres"),
  body("fechaNacimiento").isString().withMessage("La fecha de nacimiento debe ser una fecha valida"),
  body("sexo").isString().withMessage("El sexo debe ser una cadena de caracteres"),
  body("sexo").isIn(["M", "F"]).withMessage("El sexo debe ser Masculino o Femenino"),
  body("id").custom(async (value) => {
    const pacienteExistente = await prisma.paciente.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (pacienteExistente != null) {
      throw new Error("El id ya esta registrado");
    }
  }),
];

export const updatePacienteValidationRules = [
  param("idPaciente").isInt().withMessage("El id debe ser un numero entero"),
  param("idPaciente").custom(async (value, { req }) => {
    await validatePacienteOwner(value, req);
  }),
  body("nombre").isString().withMessage("El nombre debe ser una cadena de caracteres"),
  body("aPaterno").isString().withMessage("El apellido paterno debe ser una cadena de caracteres"),
  body("aMaterno").isString().withMessage("El apellido materno debe ser una cadena de caracteres"),
  body("diagnostico").isString().withMessage("El diagnostico debe ser una cadena de caracteres"),
  body("fechaNacimiento").isString().withMessage("La fecha de nacimiento debe ser una fecha valida"),
  body("sexo").isString().withMessage("El sexo debe ser una cadena de caracteres"),
  body("sexo").isIn(["M", "F"]).withMessage("El sexo debe ser Masculino o Femenino"),
];

export const deletePacienteValidationRules = [
  param("idPaciente").isInt().withMessage("El id debe ser un numero entero"),
  param("idPaciente").custom(async (value, { req }) => {
    await validatePacienteOwner(value, req);
  }),
];

export const changeTerapeutaValidationRules = [
  param("idPaciente").isInt().withMessage("El id debe ser un numero entero"),
  param("idPaciente").custom(async (value, { req }) => {
    await validatePacienteOwner(value, req);
  }),
  param("idNewTerapeuta").isInt().withMessage("El id debe ser un numero entero"),
  param("idNewTerapeuta").custom(async (value, { req }) => {
    const terapeutaExistente = await prisma.terapeuta.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (terapeutaExistente == null) {
      throw new Error("El terapeuta no existe");
    }

    if (req.user.tipo === "organizacion" && terapeutaExistente.idOrganizacion !== req.user.id) {
      throw new Error("Terapeuta de otra organizacion");
    }
  }),
];

const validatePacienteOwner = async (value, req) => {
  const pacienteExistente = await prisma.paciente.findUnique({
    where: {
      id: parseInt(value),
    },
    include: {
      terapeuta: true,
    },
  });

  if (pacienteExistente == null) {
    throw new Error("El paciente no existe");
  } else if (pacienteExistente.isActive === false) {
    throw new Error("El paciente fue eliminado");
  }

  if (req.user.tipo === "organizacion" && pacienteExistente.terapeuta.idOrganizacion !== req.user.id) {
    throw new Error("Paciente de otra organizacion");
  } else if (req.user.tipo === "terapeuta" && pacienteExistente.idTerapeuta !== req.user.id) {
    throw new Error("Paciente de otro terapeuta");
  }
};
