import { prisma } from "../utils/db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const registerOrganizacion = async (req, res) => {
  try {
    const { organizacion, email, password, direccion, telefono } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    // console.log(hash);

    const newOrganizacion = await prisma.organizacion.create({
      data: {
        organizacion: organizacion,
        email: email,
        pass: hash,
        direccion: direccion,
        telefono: telefono,
        idLicencia: parseInt(1),
      },
    });

    res.json({ msg: "Organización creada", error: false, data: newOrganizacion });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al crear organización.", error: true });
  }
};
