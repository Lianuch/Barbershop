"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URL = exports.Port = void 0;
const Port = 3000;
exports.Port = Port;
const Db_Name = "barbershop";
const DB_URL = `mongodb://127.0.0.1/${Db_Name}`;
exports.DB_URL = DB_URL;
