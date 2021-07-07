"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSessionKey = void 0;
const saveSessionKey = (res, accountId, sessionKey) => {
    res.cookie("accountId", accountId);
    res.cookie("sessionKey", sessionKey);
};
exports.saveSessionKey = saveSessionKey;
//# sourceMappingURL=cookieHandler.js.map