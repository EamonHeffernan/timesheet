"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const errorHandler_1 = __importDefault(require("../errorHandler"));
const userHandler_1 = require("./userHandler");
const router = express.Router();
module.exports = router;
router.post("/signUp", async (req, res) => {
    try {
        // Validate existence and type here
        userHandler_1.signUp("jim", "my", new Date(), "si");
        res.send("Signed up");
    }
    catch (err) {
        errorHandler_1.default(err, res);
    }
});
//# sourceMappingURL=route.js.map