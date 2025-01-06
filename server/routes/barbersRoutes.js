"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barberRouter = void 0;
const express_1 = __importDefault(require("express"));
const barbersController_1 = require("../controllers/barbersController");
const barberRouter = express_1.default.Router();
exports.barberRouter = barberRouter;
const jsonParser = express_1.default.json();
barberRouter.get("/", barbersController_1.getBarbers);
barberRouter.post("/", jsonParser, barbersController_1.addBarber);
barberRouter.delete("/:id", barbersController_1.deleteBarber);
