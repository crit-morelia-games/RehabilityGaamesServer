import jwt from "jsonwebtoken";

// Middleware para verificar el token
export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ msg: "Unauthorized", error: true, data: null })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: err.message, error: true, data: null });
      }
      req.user = user;
      req.body = { ...req.body, user };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno", error: true, data: null });
  }
}

export const authTokenOrganizacion = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ msg: "Unauthorized", error: true, data: null })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: err.message, error: true, data: null });
      }
      if (user.tipo != "organizacion") {
        return res.status(403).json({ msg: "No tienes permiso para realizar esta acción", error: true, data: null });
      }
      req.user = user;
      req.body = { ...req.body, user };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno", error: true, data: null });
  }
};

export const authTokenTerapeuta = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ msg: "Unauthorized", error: true, data: null })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: err.message, error: true, data: null });
      }
      if (user.tipo != "terapeuta") {
        return res.status(403).json({ msg: "No tienes permiso para realizar esta acción", error: true, data: null });
      }
      req.user = user;
      req.body = { ...req.body, user };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno", error: true, data: null });
  }
};
