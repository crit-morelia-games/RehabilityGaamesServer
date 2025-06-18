import { prisma } from "../utils/db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const createTerapeuta = async (req, res) => {
  try {
    const { nombre, aPaterno, aMaterno, email, password, telefono } = req.body;

    const organizacion = await prisma.organizacion.findUnique({
      where: {
        id: parseInt(req.user.id),
      },
      include: {
        licencia: true,
        terapeutas: true,
      },
    });
    if (organizacion.terapeutas.length >= organizacion.licencia.cantidad) {
      return res.status(400).json({ msg: "La organización ha alcanzado el límite de terapeutas.", error: true });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newTerapeuta = await prisma.terapeuta.create({
      data: {
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        email: email,
        pass: hash,
        idOrganizacion: parseInt(req.user.id),
        telefono: telefono,
      },
    });

    res.json({ msg: "Terapeuta creado", error: false, data: newTerapeuta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear terapeuta.", error: true });
  }
};

export const getTerapeutas = async (req, res) => {
  try {
    const terapeutas = await prisma.terapeuta.findMany({
      where: {
        idOrganizacion: parseInt(req.user.id),
        isActive: true,
      },
    });

    res.json({ msg: "Terapeutas obtenidos", error: false, data: terapeutas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener terapeutas.", error: true });
  }
};

export const getTerapeuta = async (req, res) => {
  try {
    const { id } = req.params;

    const terapeuta = await prisma.terapeuta.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ msg: "Terapeuta obtenido", error: false, data: terapeuta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener terapeuta.", error: true });
  }
};

export const updateTerapeuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, aPaterno, aMaterno, email, telefono } = req.body;

    const terapeuta = await prisma.terapeuta.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        email: email,
        telefono: telefono,
      },
    });

    res.json({ msg: "Terapeuta actualizado", error: false, data: terapeuta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar terapeuta.", error: true });
  }
};

export const deleteTerapeuta = async (req, res) => {
  try {
    const { id } = req.params;

    const terapeuta = await prisma.terapeuta.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isActive: false,
      },
    });

    res.json({ msg: "Terapeuta eliminado", error: false, data: terapeuta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al eliminar terapeuta.", error: true });
  }
};
