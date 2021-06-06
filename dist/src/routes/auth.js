"use strict";
/*
    Rutas de auth
    host + /api/auth
*/
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var express_validator_1 = require("express-validator");
var validarCampos_1 = require("../middlewares/validarCampos");
var validarToken_1 = require("../middlewares/validarToken");
var authroutes = express_1.Router();
authroutes.get("/test", auth_1.test);
authroutes.post("/new", [
    express_validator_1.check("name", "El nombre es obligatorio").not().isEmpty(),
    express_validator_1.check("email", "El email es obligatorio").isEmail(),
    express_validator_1.check("password", "El password es obligatorio y debe de ser 6 caracteres").isLength({ min: 6 }),
    validarCampos_1.validarCampos,
], auth_1.createUser);
authroutes.post("/login", [
    express_validator_1.check("email", "El email es obligatorio").isEmail(),
    express_validator_1.check("password", "El password es obligatorio y debe de ser 6 caracteres").isLength({ min: 6 }),
    validarCampos_1.validarCampos,
], auth_1.login);
authroutes.get("/renew", validarToken_1.verificaToken, auth_1.renewToken);
exports.default = authroutes;
