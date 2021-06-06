"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
var moment_1 = __importDefault(require("moment"));
// const isDate = (value: any, rest: any) => {
var isDate = function (value, rest) {
    if (!value) {
        return false;
    }
    // console.log({value})
    // console.log({rest})
    var fecha = moment_1.default(value);
    if (fecha.isValid()) {
        return true;
    }
    else {
        return false;
    }
};
exports.isDate = isDate;
