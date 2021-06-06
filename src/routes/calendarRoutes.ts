import { Router } from "express";
import { check } from "express-validator";
import { getEventos, crearEvent,updateEvent,deleteEvent } from "../controllers/eventsCalendar";
import { isDate } from "../helpers/isDate";
import { validarCampos } from "../middlewares/validarCampos";
import { verificaToken } from "../middlewares/validarToken";


const calendarRoutes = Router();
calendarRoutes.use(verificaToken) // aplicar middleware a todas la rutas 

calendarRoutes.get("/", getEventos);
calendarRoutes.post("/newEvent",[
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha fin es obligatoria').custom(isDate),
    validarCampos
] ,crearEvent);
calendarRoutes.put("/:id",[
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha fin es obligatoria').custom(isDate),
    validarCampos
], updateEvent);
calendarRoutes.delete("/:id",deleteEvent);

// calendarRoutes.get("/", verificaToken, getEventos);
// calendarRoutes.post("/newEvent", verificaToken, crearEvent);
// calendarRoutes.put("/:id", verificaToken, updateEvent);
// calendarRoutes.delete("/:id", verificaToken, deleteEvent);

export default calendarRoutes;
