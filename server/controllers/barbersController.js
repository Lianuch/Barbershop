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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBarber = exports.addBarber = exports.getBarbers = void 0;
const barbersModel_1 = require("../models/barbersModel");
const getBarbers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const barbers = yield barbersModel_1.Barber.find();
    res.json(barbers);
});
exports.getBarbers = getBarbers;
const addBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname } = req.body;
    const newBarber = yield barbersModel_1.Barber.create({ name, surname });
    res.json(newBarber);
});
exports.addBarber = addBarber;
const deleteBarber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedBarber = yield barbersModel_1.Barber.findByIdAndDelete(id);
    res.json(deletedBarber);
});
exports.deleteBarber = deleteBarber;
