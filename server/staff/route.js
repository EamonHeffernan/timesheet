"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataValidator_1 = require("../dataValidation/dataValidator");
const httpResponses_1 = require("../httpResponses");
const inputValidator_1 = require("../dataValidation/inputValidator");
const middleware_1 = require("../users/middleware");
const staffHandler_1 = require("./staffHandler");
const userHandler_1 = require("../users/userHandler");
const router = express_1.default.Router();
module.exports = router;
router.get("/", middleware_1.authenticate(userHandler_1.AllowedGroups.Staff), (req, res) => {
    const user = res.locals.user;
    return httpResponses_1.returnCode(res, 200, "", user.sendableUser());
});
router.post("/submitDay", middleware_1.authenticate(userHandler_1.AllowedGroups.Staff), inputValidator_1.validateInput([
    { name: "start", type: inputValidator_1.InputType.Date },
    { name: "end", type: inputValidator_1.InputType.Date },
]), async (req, res) => {
    //Check and validate breaks
    let validBreaks = [];
    if ("breaks" in req.body && Array.isArray(req.body.breaks)) {
        const breaks = req.body.breaks;
        for (let i = 0; i < breaks.length; i++) {
            if (typeof breaks[i] == "object") {
                if ("start" in breaks[i] && "end" in breaks[i]) {
                    if (typeof breaks[i].start == "string" &&
                        typeof breaks[i].end == "string") {
                        const start = dataValidator_1.stringToDate(breaks[i].start);
                        const end = dataValidator_1.stringToDate(breaks[i].end);
                        if (start != null && end != null) {
                            validBreaks.push({ start: start, end: end });
                            break;
                        }
                    }
                }
            }
            return httpResponses_1.returnCode(res, 400, "Breaks not formatted correctly");
        }
    }
    if (staffHandler_1.addDay(res.locals.user, req.body.start, req.body.end, validBreaks)) {
        return httpResponses_1.returnCode(res, 200);
    }
    else {
        return httpResponses_1.returnCode(res, 400, "Day not formatted correctly");
    }
});
router.get("/days", middleware_1.authenticate(userHandler_1.AllowedGroups.Staff), inputValidator_1.validateInput([{ name: "duration", type: inputValidator_1.InputType.Number }]), (req, res) => {
    if (req.body.duration <= 30)
        return httpResponses_1.returnCode(res, 200, "", staffHandler_1.getDays(res.locals.user, req.body.duration));
    return httpResponses_1.returnCode(res, 400, "Duration size is greater than allowed.");
});
