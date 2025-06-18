import { body } from "express-validator";
import { prisma } from "../../utils/db.js";

export const loginValidationRules = [
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").isString().withMessage("La contraseña debe ser un string"),
];

export const loginTValidationRules = [
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").isString().withMessage("La contraseña debe ser un string"),
  body("email").custom(async (value) => {
    const terapeuta = await prisma.terapeuta.findUnique({
      where: {
        email: value,
      },
    });
    console.log("Terapeuta encontrado:", terapeuta);
    if (terapeuta.isActive === false) {
      console.log("Cuenta no activa");
      throw new Error("El correo electrónico no esta asociado a una cuenta.");
    }
  }),
];
