import { param, body } from "express-validator";
import { prisma } from "../../utils/db.js";

export const getPartidasPacienteValidationRules = [
  param("idPaciente").isNumeric().withMessage("El id del paciente debe ser un número"),
  param("idPaciente").custom(async (value) => {
    const pacienteExistente = await prisma.paciente.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (pacienteExistente == null) {
      throw new Error("El paciente no existe");
    }
  }),
];

export const getPartidaValidationRules = [
  param("id").isNumeric().withMessage("El id de la partida debe ser un número"),
  param("id").custom(async (value) => {
    const partidaExistente = await prisma.partida.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (partidaExistente == null) {
      throw new Error("La partida no existe");
    }
  }),
];

export const createPartidaValidationRules = [
  body("idMiniJuego").isNumeric().withMessage("El id del minijuego debe ser un número"),
  body("idMiniJuego").custom(async (value) => {
    const miniJuegoExistente = await prisma.miniJuego.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (miniJuegoExistente == null) {
      throw new Error("El minijuego no existe");
    }
  }),
  body("idPaciente").isNumeric().withMessage("El id del paciente debe ser un número"),
  body("idPaciente").custom(async (value) => {
    const pacienteExistente = await prisma.paciente.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (pacienteExistente == null) {
      throw new Error("El paciente no existe");
    }
  }),
  body("dificultad").isNumeric().withMessage("La dificultad debe ser un número"),
  body("tiempo").isNumeric().withMessage("El tiempo debe ser un número"),
  body("puntuacion").isNumeric().withMessage("La puntuación debe ser un número"),
  body("idExtremidad").isNumeric().withMessage("El id de la extremidad debe ser un número"),
  body("idExtremidad").custom(async (value) => {
    const extremidadExistente = await prisma.extremidad.findUnique({
      where: {
        id: parseInt(value),
      },
    });

    if (extremidadExistente == null) {
      throw new Error("La extremidad no existe");
    }
  }),
  body("angMax").isFloat().withMessage("El ángulo máximo debe ser un número"),
  body("derMax").isFloat().withMessage("El ángulo máximo a la derecha debe ser un número"),
  body("izqMax").isFloat().withMessage("El ángulo máximo a la izquierda debe ser un número"),
  body("arrMax").isFloat().withMessage("El ángulo máximo hacia arriba debe ser un número"),
  body("abaMax").isFloat().withMessage("El ángulo máximo hacia abajo debe ser un número"),
  body("timeMax").isFloat().withMessage("El tiempo máximo debe ser un número"),
  body("timeMin").isFloat().withMessage("El tiempo mínimo debe ser un número"),
  body("timeAvg").isFloat().withMessage("El tiempo promedio debe ser un número"),
];