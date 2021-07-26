"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.maxSessionLength = void 0;
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("./model/db");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next_1.default({ dev });
const handle = nextApp.getRequestHandler();
const app = express_1.default();
const cookieSecret = process.env.COOKIE_SECRET || "DefaultCookieSecret";
exports.maxSessionLength = 86400000;
exports.cookieOptions = {
    httpOnly: true,
    signed: true,
    sameSite: "strict",
    maxAge: exports.maxSessionLength,
    secure: !dev,
};
nextApp.prepare().then(() => {
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(cookie_parser_1.default(cookieSecret));
    app.use("/api/users", require("./users/route"));
    app.use("/api/staff", require("./staff/route"));
    app.use("/api/admin", require("./admin/route"));
    app.get("*", (req, res) => {
        return handle(req, res);
    });
});
exports.default = app;
