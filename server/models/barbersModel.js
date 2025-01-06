"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barber = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const barbersSchema = new mongoose_1.default.Schema({
    name: String,
    surname: String,
});
const Barber = mongoose_1.default.model("Barber", barbersSchema);
exports.Barber = Barber;
