/*
    Rutas de auth
    host + /api/auth
*/

import { Router } from "express";
import { createUser, login, renewToken, test } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { verificaToken } from "../middlewares/validarToken";

const authroutes = Router();

authroutes.get("/test", test);

authroutes.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe de ser 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  createUser
);

authroutes.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe de ser 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

authroutes.get("/renew",verificaToken ,renewToken);

export default authroutes;
