"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const httpResponses_1 = require("../httpResponses");
const user_1 = require("../model/user");
const userHandler_1 = require("./userHandler");
const authenticate = async (req, res, next) => {
    if ("accountId" in req.body && "sessionKey" in req.body) {
        if (typeof req.body.accountId == "string" &&
            typeof req.body.sessionKey == "string") {
            const user = await user_1.User.findById(req.body.accountId);
            if (user != null) {
                res.locals.user = user;
                if (userHandler_1.verifySessionKey(user, req.body.sessionKey)) {
                    next();
                }
            }
        }
    }
    return httpResponses_1.returnCode(res, 404, "Authentication failed");
};
exports.authenticate = authenticate;
//# sourceMappingURL=middleware.js.map