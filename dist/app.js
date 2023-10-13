"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksRouter_1 = require("./router/tasksRouter");
const authRouter_1 = require("./router/authRouter");
const app = (0, express_1.default)();
require("dotenv").config();
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(authRouter_1.authRouter);
app.use(tasksRouter_1.tasksRouter);
app.listen(8000);
