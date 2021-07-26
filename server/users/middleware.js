"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const httpResponses_1 = require("../httpResponses");
const user_1 = require("../model/user");
const userHandler_1 = require("./userHandler");
const authenticate = (allowedGroups) => {
    return async function (req, res, next) {
        if ("sessionKey" in req.signedCookies) {
            if (typeof req.signedCookies.sessionKey == "string") {
                const user = await user_1.User.findOne({
                    sessionKey: req.signedCookies.sessionKey,
                });
                if (user != null) {
                    if (userHandler_1.authenticateUser(user, req.signedCookies.sessionKey, allowedGroups)) {
                        res.locals.user = user;
                        return next();
                    }
                }
            }
        }
        return httpResponses_1.returnCode(res, 401, "Authentication failed");
    };
};
exports.authenticate = authenticate;
