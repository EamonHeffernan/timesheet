"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSessionKey = exports.saveSessionKey = void 0;
const app_1 = require("../app");
const saveSessionKey = (res, accountId, sessionKey) => {
    res.cookie("sessionKey", sessionKey, app_1.cookieOptions);
};
exports.saveSessionKey = saveSessionKey;
const clearSessionKey = (res) => {
    res.clearCookie("sessionKey");
};
exports.clearSessionKey = clearSessionKey;
