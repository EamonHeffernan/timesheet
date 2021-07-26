"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const httpResponses_1 = require("../httpResponses");
const inputValidator_1 = require("../dataValidation/inputValidator");
const cookieHandler_1 = require("./cookieHandler");
const userHandler_1 = require("./userHandler");
const middleware_1 = require("./middleware");
const router = express_1.default.Router();
module.exports = router;
router.post("/signUp", inputValidator_1.validateInput([
    { name: "email", type: inputValidator_1.InputType.String },
    { name: "name", type: inputValidator_1.InputType.String },
    { name: "password", type: inputValidator_1.InputType.String },
]), async (req, res) => {
    try {
        // Validate existence and type here
        const response = await userHandler_1.signUp(req.body.name, req.body.email, new Date(), req.body.password);
        if ("user" in response) {
            cookieHandler_1.saveSessionKey(res, response.user.id, response.sessionKey);
            return httpResponses_1.returnCode(res, 200, "User created", response.user.sendableUser());
        }
        else if ("error" in response) {
            return httpResponses_1.returnCode(res, 400, response.error);
        }
        return errorHandler_1.default(res, null, "An unknown error has occurred");
    }
    catch (err) {
        return errorHandler_1.default(res, err);
    }
});
router.post("/signIn", inputValidator_1.validateInput([
    { name: "email", type: inputValidator_1.InputType.String },
    { name: "password", type: inputValidator_1.InputType.String },
]), async (req, res) => {
    try {
        // Validate existence and type here
        const response = await userHandler_1.signIn(req.body.email, req.body.password);
        if ("user" in response) {
            cookieHandler_1.saveSessionKey(res, response.user.id, response.sessionKey);
            return httpResponses_1.returnCode(res, 200, "Signed in", response.user.sendableUser());
        }
        else if ("error" in response) {
            return httpResponses_1.returnCode(res, 400, response.error);
        }
        return errorHandler_1.default(res, null, "An unknown error has occurred");
    }
    catch (err) {
        return errorHandler_1.default(res, err);
    }
});
router.post("/signOut", middleware_1.authenticate(userHandler_1.AllowedGroups.Both), (req, res) => {
    userHandler_1.signOut(res.locals.user);
    cookieHandler_1.clearSessionKey(res);
    return httpResponses_1.returnCode(res, 200, "Signed out.");
});
