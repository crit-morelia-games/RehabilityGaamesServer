import { prisma } from "../utils/db.js";

export const getAllPacientes = async (req, res) => {
  try {
    const response = await prisma.terapeuta.findMany({
      where: {
        idOrganizacion: parseInt(req.user.id),
      },
      select: {
        pacientes: {
          select: {
            id: true,
            nombre: true,
            aPaterno: true,
            aMaterno: true,
            diagnostico: true,
            sexo: true,
          },
          where: {
            isActive: true,
          }
        },
      },
    });

    const pacientes = [];
    response.forEach((terapeuta) => {
      terapeuta.pacientes.forEach((paciente) => {
        pacientes.push(paciente);
      });
    });
    res.json({ msg: "Pacientes de " + req.user.email, error: false, data: pacientes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener pacientes", error: true, data: null });
  }
};

export const getPacientes = async (req, res) => {
  try {
    const { idTerapeuta } = req.params;

    const response = await prisma.paciente.findMany({
      where: {
        idTerapeuta: parseInt(idTerapeuta),
        isActive: true,
      },
      select: {
        id: true,
        nombre: true,
        aPaterno: true,
        aMaterno: true,
        sexo: true,
        diagnostico: true,
        fechaNacimiento: true,
        createdAt: true,
      }
    });
    res.json({ msg: "Pacientes del terapeuta: " + idTerapeuta, error: false, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener pacientes", error: true, data: null });
  }
};

export const getPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: {
        id: parseInt(idPaciente),
      },
    });

    res.json({ msg: "Paciente: " + idPaciente, error: false, data: paciente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener paciente", error: true, data: null });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const { id, nombre, aPaterno, aMaterno, diagnostico, fechaNacimiento, sexo } = req.body;

    const date = new Date(fechaNacimiento);

    const paciente = await prisma.paciente.create({
      data: {
        id: parseInt(id),
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        diagnostico: diagnostico,
        fechaNacimiento: date,
        idTerapeuta: parseInt(req.user.id),
        sexo: sexo,
      },
    });

    res.json({ msg: "Paciente creado", error: false, data: paciente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear paciente", error: true, data: null });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const { nombre, aPaterno, aMaterno, diagnostico, fechaNacimiento, sexo } = req.body;

    const date = new Date(fechaNacimiento);

    const paciente = await prisma.paciente.update({
      where: {
        id: parseInt(idPaciente),
      },
      data: {
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        diagnostico: diagnostico,
        fechaNacimiento: date,
        sexo: sexo,
      },
    });

    res.json({ msg: "Paciente actualizado", error: false, data: paciente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar paciente", error: true, data: null });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const paciente = await prisma.paciente.update({
      where: {
        id: parseInt(idPaciente),
      },
      data: {
        isActive: false,
      },
    });

    res.json({ msg: "Paciente eliminado", error: false, data: paciente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar paciente", error: true, data: null });
  }
};

export const changeTerapeuta = async (req, res) => {
  try {
    const { idPaciente, idNewTerapeuta } = req.params;

    const paciente = await prisma.paciente.update({
      where: {
        id: parseInt(idPaciente),
      },
      data: {
        idTerapeuta: parseInt(idNewTerapeuta),
      },
    });

    res.json({ msg: "Terapeuta cambiado", error: false, data: paciente });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al cambiar terapeuta", error: true, data: null });
  }
};
