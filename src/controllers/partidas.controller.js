import { prisma } from "../utils/db.js";

export const getPartidasPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const response = await prisma.partida.findMany({
      where: {
        idPaciente: parseInt(idPaciente),
      },
      select: {
        id: true,
        idPaciente: true,
        idTerapeuta: true,
        dificultad: true,
        tiempo: true,
        puntuacion: true,
        anguloMaximo: true,
        derechoMaximo: true,
        izquierdoMaximo: true,
        arribaMaximo: true,
        abajoMaximo: true,
        responseTimeMax: true,
        responseTimeMin: true,
        responseTimeAvg: true,
        createdAt: true,
        miniJuego: {
          select: {
            miniJuego: true,
          },
        },
        extremidad: {
          select: {
            extremidad: true,
          },
        },
      },
    });

    res.json({ msg: "Partidas del paciente: " + idPaciente, error: false, data: response });
  } catch (error) {
    console.log(error);
  }
};

export const getPartida = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await prisma.partida.findMany({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        dificultad: true,
        tiempo: true,
        puntuacion: true,
        anguloMaximo: true,
        derechoMaximo: true,
        izquierdoMaximo: true,
        arribaMaximo: true,
        abajoMaximo: true,
        responseTimeMax: true,
        responseTimeMin: true,
        responseTimeAvg: true,
        createdAt: true,
        miniJuego: {
          select: {
            miniJuego: true,
          },
        },
        extremidad: {
          select: {
            extremidad: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nombre: true,
            aPaterno: true,
            aMaterno: true,
            diagnostico: true,
            sexo: true,
          },
        },
        terapeuta: {
          select: {
            id: true,
            nombre: true,
            aPaterno: true,
            aMaterno: true,
          },
        },
        footballGame: {
          select: {
            atajadasAbajo: true,
            atajadasArriba: true,
            atajadasEnMedio: true,
            golesAbajo: true,
            golesArriba: true,
            golesEnMedio: true,
          },
        },
      },
    });
    res.json({ msg: "Partida con id: " + id, error: false, data: response });
  } catch (error) {
    console.log(error);
  }
};

export const createPartida = async (req, res) => {
  try {
    const { idMiniJuego, idPaciente, dificultad, tiempo, puntuacion, idExtremidad } = req.body;
    const { angMax, derMax, izqMax, arrMax, abaMax, timeMax, timeMin, timeAvg } = req.body;

    const newPartida = await prisma.partida.create({
      data: {
        idMiniJuego: parseInt(idMiniJuego),
        idPaciente: parseInt(idPaciente),
        idTerapeuta: parseInt(req.user.id),
        dificultad: parseInt(dificultad),
        tiempo: parseInt(tiempo),
        puntuacion: parseInt(puntuacion),
        idExtremidad: parseInt(idExtremidad),
        anguloMaximo: parseFloat(angMax),
        derechoMaximo: parseFloat(derMax),
        izquierdoMaximo: parseFloat(izqMax),
        arribaMaximo: parseFloat(arrMax),
        abajoMaximo: parseFloat(abaMax),
        responseTimeMax: parseFloat(timeMax),
        responseTimeMin: parseFloat(timeMin),
        responseTimeAvg: parseFloat(timeAvg),
      },
    });

    res.json({ msg: "Partida guardada con éxito", error: false, data: newPartida });
  } catch (error) {
    console.log(error);
  }
};

export const createFootballGame = async (req, res) => {
  try {
    const {idPaciente, easyMode, tiempo, atajadasAbajo, atajadasArriba, atajadasEnMedio, golesAbajo, golesArriba, golesEnMedio} = req.body;
    const newPartida = await prisma.partida.create({
      data: {
        idMiniJuego: parseInt(4),
        idPaciente: parseInt(idPaciente),
        idTerapeuta: parseInt(req.user.id),
        dificultad: easyMode ? 1 : 2,
        tiempo: parseInt(tiempo),
        puntuacion: parseInt(atajadasAbajo) + parseInt(atajadasArriba) + parseInt(atajadasEnMedio),
        idExtremidad: parseInt(3),
      },
    });
    const newFootballGame = await prisma.footballGame.create({
      data: {
        atajadasAbajo: parseInt(atajadasAbajo),
        atajadasArriba: parseInt(atajadasArriba),
        atajadasEnMedio: parseInt(atajadasEnMedio),
        golesAbajo: parseInt(golesAbajo),
        golesArriba: parseInt(golesArriba),
        golesEnMedio: parseInt(golesEnMedio),
        idPartida: newPartida.id,
      },
    });
    res.json({ msg: "Juego de fútbol creado con éxito", error: false, data: newFootballGame });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear el juego de fútbol", error: true, data: req.body });
  }
};
