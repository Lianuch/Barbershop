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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const barbersRoutes_1 = require("./routes/barbersRoutes");
const app = (0, express_1.default)();
app.use("/api/barbers", barbersRoutes_1.barberRouter);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connect(config_1.DB_URL);
        console.log("Connected to DB");
        app.listen(config_1.Port, () => {
            console.log(`Server started on port ${config_1.Port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main();
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    process.exit();
}));
