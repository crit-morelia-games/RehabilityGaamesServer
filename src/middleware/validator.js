import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors.array()[0].msg;
    return res.status(422).json({ msg: errorMsg, error: true, data: null });
  }

  next();
};
