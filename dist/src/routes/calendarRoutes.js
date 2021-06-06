"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var eventsCalendar_1 = require("../controllers/eventsCalendar");
var isDate_1 = require("../helpers/isDate");
var validarCampos_1 = require("../middlewares/validarCampos");
var validarToken_1 = require("../middlewares/validarToken");
var calendarRoutes = express_1.Router();
calendarRoutes.use(validarToken_1.verificaToken); // aplicar middleware a todas la rutas 
calendarRoutes.get("/", eventsCalendar_1.getEventos);
calendarRoutes.post("/newEvent", [
    express_validator_1.check('title', 'El title es obligatorio').not().isEmpty(),
    express_validator_1.check('start', 'Fecha de inicio es obligatoria').custom(isDate_1.isDate),
    express_validator_1.check('end', 'Fecha fin es obligatoria').custom(isDate_1.isDate),
    validarCampos_1.validarCampos
], eventsCalendar_1.crearEvent);
calendarRoutes.put("/:id", [
    express_validator_1.check('title', 'El title es obligatorio').not().isEmpty(),
    express_validator_1.check('start', 'Fecha de inicio es obligatoria').custom(isDate_1.isDate),
    express_validator_1.check('end', 'Fecha fin es obligatoria').custom(isDate_1.isDate),
    validarCampos_1.validarCampos
], eventsCalendar_1.updateEvent);
calendarRoutes.delete("/:id", eventsCalendar_1.deleteEvent);
// calendarRoutes.get("/", verificaToken, getEventos);
// calendarRoutes.post("/newEvent", verificaToken, crearEvent);
// calendarRoutes.put("/:id", verificaToken, updateEvent);
// calendarRoutes.delete("/:id", verificaToken, deleteEvent);
exports.default = calendarRoutes;
