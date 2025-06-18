import { prisma } from "../utils/db.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const ping = (req, res) => {
  try {
    res.send("pong");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el ping...", error: true });
  }
};

export const pruebaDB = async (req, res) => {
  try {
    const response = await prisma.licencia.findMany();
    return res.json({ msg: "Prueba exitosa", error: false, data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en la base de datos...", error: true });
  }
};

export const pruebaToken = (req, res) => {
  try {
    res.json({ msg: "Token válido", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el token...", error: true });
  }
};

export const login = async (req, res) => {
  console.log("Iniciando sesión...");
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      console.log("Error de validación:", errorMsg);
      return res.status(422).json({ msg: errorMsg, error: true, data: null });
    }

    const { email, password } = req.body;

    const organizacion = await prisma.organizacion.findUnique({
      where: {
        email: email,
      },
    });

    if (organizacion == null) {
      console.log("Organización no encontrada");
      loginTM(req, res);
      return;
    } else if (organizacion.isActive === false) {
      console.log("Cuenta eliminada");
      return res.status(422).json({ msg: "La cuenta fue eliminada.", error: true, data: null });
    }

    const passwordsMatch = bcrypt.compareSync(password, organizacion.pass);

    if (!passwordsMatch) {
      console.log("Contraseña incorrecta");
      return res.status(422).json({ msg: "Correo electrónico y/o contraseña incorrectos", error: true, data: null });
    }

    // Una vez validado el usuario

    await prisma.organizacion.update({
      where: {
        id: organizacion.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    const tokenData = { name: organizacion.nombre, email: email, id: organizacion.id, tipo: "organizacion" };
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
    console.log("Login exitoso de organización");
    res.json({ msg: "Login exitoso de organización", error: false, data: accessToken, role: "organizacion" });
  } catch (error) {
    console.log(error);
    console.log("Error al iniciar sesión");
    return res.status(500).json({ msg: "Error al iniciar sesión.", error: true });
  }
};

const loginTM = async (req, res) => {
  console.log("Iniciando sesión como terapeuta...");
  const { email, password } = req.body;

  const terapeuta = await prisma.terapeuta.findUnique({

    where: {
      email: email,
    },
  });

  if (terapeuta == null) {
    console.log("Terapeuta no encontrado");
    return res.status(422).json({ msg: "Correo electrónico y/o contraseña incorrectos", error: true, data: null });
  } else if (terapeuta.isActive === false) {
    return res.status(422).json({ msg: "La cuenta fue eliminada.", error: true, data: null });
  }

  const passwordsMatch = bcrypt.compareSync(password, terapeuta.pass);

  if (!passwordsMatch) {
    console.log("Contraseña incorrecta");
    return res.status(422).json({ msg: "Correo electrónico y/o contraseña incorrectos", error: true, data: null });
  }

  // Una vez validado el usuario

  await prisma.terapeuta.update({
    where: {
      id: terapeuta.id,
    },
    data: {
      lastLogin: new Date(),
    },
  });

  const tokenData = { name: terapeuta.nombre + " " + terapeuta.aPaterno, email: email, id: terapeuta.id, tipo: "terapeuta" };
  const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
  console.log("Login exitoso de terapeuta");
  res.json({ msg: "Login exitoso de terapeuta", error: false, data: accessToken, role: "terapeuta" });
};

export const loginT = async (req, res) => {
  console.log("Iniciando sesión como terapeuta desde Unity...");
  try {
    const { email, password } = req.body;

    const terapeuta = await prisma.terapeuta.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        nombre: true,
        aPaterno: true,
        aMaterno: true,
        email: true,
        pass: true,
        organizacion: {
          select: {
            organizacion: true,
          },
        },
        _count: {
          select: {
            pacientes: true,
          },
        },
      },
    });

    const passwordsMatch = bcrypt.compareSync(password, terapeuta.pass);

    if (!passwordsMatch) {
      console.log("Contraseña incorrecta");
      return res
        .status(422)
        .json({ msg: "La contraseña que ingresaste es incorrecta. ¿Olvidaste tu contraseña?", error: true });
    }

    // Generar lo que se manda
    const data2send = {
      id: terapeuta.id,
      nombre: terapeuta.nombre + " " + terapeuta.aPaterno + " " + terapeuta.aMaterno,
      email: email,
      organizacion: terapeuta.organizacion.organizacion,
      pacientes: terapeuta._count.pacientes,
    };

    // Una vez validado el usuario

    await prisma.terapeuta.update({
      where: {
        id: terapeuta.id,
      },
      data: {
        lastLoginApp: new Date(),
      },
    });

    const tokenData = { name: terapeuta.nombre + " " + terapeuta.aPaterno, email: email, id: terapeuta.id, tipo: "terapeuta" };
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
    res.json({ token: accessToken, error: false, msg: "Login exitoso.", data: data2send });
  } catch (error) {
    console.log(error);
    console.log("Error al iniciar sesión");
    return res.status(500).json({ msg: "Error al iniciar sesión.", error: true });
  }
};
