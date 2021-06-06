"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.crearEvent = exports.getEventos = void 0;
var Events_1 = require("../models/Events");
var getEventos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var events, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Events_1.EventModel.find({}).populate("user", "name").exec()];
            case 1:
                events = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Get eventos",
                        events: events,
                    })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        ok: true,
                        msg: "Hable con el administrador",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEventos = getEventos;
var crearEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, event_1, eventSaved, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                console.log(req.usuario.usuario);
                event_1 = new Events_1.EventModel(body);
                event_1.user = req.usuario.usuario.uid;
                return [4 /*yield*/, event_1.save()];
            case 1:
                eventSaved = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Create eventos",
                        eventSaved: eventSaved,
                    })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        ok: true,
                        msg: "Hable con el administrador",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.crearEvent = crearEvent;
// con findByIdAndUpdate
// const updateEvent = async (req: any, res: Response) => {
//   const { id } = req.params;
//   try {
//     const { body } = req;
//     let eventUpdated: any = await EventModel.findById(id).exec();
//     if (eventUpdated) {
//       // console.log({eventUpdated})
//       // console.log({user: req?.usuario})
//       // eventUpdated.user = req.usuario.usuario?.uid;
//       if (eventUpdated.user.toString() != req?.usuario?.usuario?.uid) {
//         console.log(eventUpdated.user, req?.usuario?.usuario?.uid);
//         return res.status(401).json({
//           ok: false,
//           msg: "No tiene privilegio de editar este evento",
//         });
//       }
//       const newEvent = {
//         ...body,
//         user: eventUpdated.user,
//       };
//       const eventUpdate: any = await EventModel.findByIdAndUpdate(
//         id,
//         newEvent,
//         { new: true }
//       );
//       return res.status(200).json({
//         ok: true,
//         msg: "Update eventos",
//         eventUpdate,
//       });
//     } else {
//       return res.status(400).json({
//         ok: true,
//         msg: "El evento con el id " + id + " no existe",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };
// sin findByIdAndUpdate
var updateEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, start, end, notes, eventUpdated, eventUpdatedeSave, error_3;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                id = req.params.id;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, , 7]);
                _a = req.body, title = _a.title, start = _a.start, end = _a.end, notes = _a.notes;
                return [4 /*yield*/, Events_1.EventModel.findById(id).exec()];
            case 2:
                eventUpdated = _f.sent();
                if (!eventUpdated) return [3 /*break*/, 4];
                if (eventUpdated.user.toString() != ((_c = (_b = req === null || req === void 0 ? void 0 : req.usuario) === null || _b === void 0 ? void 0 : _b.usuario) === null || _c === void 0 ? void 0 : _c.uid)) {
                    console.log(eventUpdated.user, (_e = (_d = req === null || req === void 0 ? void 0 : req.usuario) === null || _d === void 0 ? void 0 : _d.usuario) === null || _e === void 0 ? void 0 : _e.uid);
                    return [2 /*return*/, res.status(401).json({
                            ok: false,
                            msg: "No tiene privilegio de editar este evento",
                        })];
                }
                eventUpdated.title = title || "";
                eventUpdated.start = start || "";
                eventUpdated.end = end || "";
                eventUpdated.notes = notes || "";
                return [4 /*yield*/, eventUpdated.save()];
            case 3:
                eventUpdatedeSave = _f.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Update eventos",
                        eventUpdatedeSave: eventUpdatedeSave
                    })];
            case 4: return [2 /*return*/, res.status(400).json({
                    ok: true,
                    msg: "El evento con el id " + id + " no existe",
                })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _f.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: "Hable con el administrador",
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateEvent = updateEvent;
var deleteEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, eventDeleted, deletedEvent, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Events_1.EventModel.findById(id).exec()];
            case 2:
                eventDeleted = _c.sent();
                if (!eventDeleted) return [3 /*break*/, 4];
                if (eventDeleted.user.toString() != ((_b = (_a = req === null || req === void 0 ? void 0 : req.usuario) === null || _a === void 0 ? void 0 : _a.usuario) === null || _b === void 0 ? void 0 : _b.uid)) {
                    return [2 /*return*/, res.status(401).json({
                            ok: false,
                            msg: "No tiene privilegio de eliminar este evento",
                        })];
                }
                return [4 /*yield*/, Events_1.EventModel.findByIdAndDelete(id)];
            case 3:
                deletedEvent = _c.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Delete eventos",
                        deletedEvent: deletedEvent,
                    })];
            case 4: return [2 /*return*/, res.status(400).json({
                    ok: true,
                    msg: "El evento con el id " + id + " no existe",
                })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _c.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: "Hable con el administrador",
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteEvent = deleteEvent;
