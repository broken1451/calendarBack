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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.renewToken = exports.login = exports.createUser = void 0;
var User_model_1 = require("../models/User.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Token_1 = __importDefault(require("../helpers/Token"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, usuario, salt, user, userCreated, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_model_1.UsuarioModel.findOne({ email: email }).exec()];
            case 2:
                usuario = _b.sent();
                if (usuario) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "El usuario ya existe con ese correo",
                        })];
                }
                salt = bcrypt_1.default.genSaltSync();
                user = {
                    name: name,
                    email: email,
                    password: bcrypt_1.default.hashSync(password, salt),
                };
                userCreated = new User_model_1.UsuarioModel(user);
                return [4 /*yield*/, userCreated.save()];
            case 3:
                _b.sent();
                delete user.password;
                delete user.email;
                user.uid = userCreated.id;
                return [4 /*yield*/, Token_1.default.generateJwtToken(user)];
            case 4:
                token = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        ok: true,
                        msg: "registro",
                        uid: userCreated.id,
                        name: userCreated.name,
                        userCreated: userCreated,
                        token: token,
                    })];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: "Error interno, hable con el administrador",
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userLogin, payload, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, User_model_1.UsuarioModel.findOne({ email: email }).exec()];
            case 2:
                userLogin = _b.sent();
                if (!userLogin) return [3 /*break*/, 6];
                if (!userLogin.compararClave(password)) return [3 /*break*/, 4];
                payload = {
                    uid: userLogin._id,
                    name: userLogin.name,
                    email: userLogin.email,
                };
                return [4 /*yield*/, Token_1.default.generateJwtToken(payload)];
            case 3:
                token = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        uid: userLogin.id,
                        name: userLogin.name,
                        userLogin: userLogin,
                        token: token,
                    })];
            case 4:
                if (password == "" || userLogin.password == "") {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            mensaje: "Campo vacio",
                            errors: { message: "El campo no puede estar vacio" },
                        })];
                }
                else if (password !== userLogin.password) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            mensaje: "Clave incorrecta",
                            errors: { message: "Clave incorrecta" },
                        })];
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({
                    ok: false,
                    mensaje: "Credenciales no son correctas",
                    errors: { message: "Credenciales no son correctas" },
                })];
            case 7: return [2 /*return*/, res.status(200).json({
                    ok: true,
                    msg: "login",
                    email: email,
                    password: password,
                })];
            case 8:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: "Error interno",
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var renewToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, _a, uid, name, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                usuario = req.usuario;
                _a = usuario.usuario, uid = _a.uid, name = _a.name;
                console.log(uid, name);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Token_1.default.generateJwtToken(usuario)];
            case 2:
                token = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "renew token",
                        uid: uid,
                        name: name,
                        usuario: usuario,
                        token: token,
                    })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: "Error interno",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.renewToken = renewToken;
var test = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).json({
                ok: true,
            })];
    });
}); };
exports.test = test;
