"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./model/db");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use("/api/users", require("./users/route"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
//# sourceMappingURL=app.js.map