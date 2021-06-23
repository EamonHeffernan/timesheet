"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const errorHandler_1 = __importDefault(require("../errorHandler"));
const httpResponses_1 = require("../httpResponses");
const inputValidator_1 = require("../inputValidator");
const userHandler_1 = require("./userHandler");
const router = express.Router();
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
            return httpResponses_1.returnCode(res, 200, "User created", response.user);
        }
        else if ("error" in response) {
            return httpResponses_1.returnCode(res, 400, response.error);
        }
        return httpResponses_1.returnCode(res, 500, "An unknown error has occurred");
    }
    catch (err) {
        return errorHandler_1.default(res, err);
    }
});
//# sourceMappingURL=route.js.map