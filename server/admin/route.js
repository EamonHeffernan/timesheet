"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const httpResponses_1 = require("../httpResponses");
const user_1 = require("../model/user");
const middleware_1 = require("../users/middleware");
const adminHandler_1 = require("./adminHandler");
const inputValidator_1 = require("../dataValidation/inputValidator");
const changeRequest_1 = require("../model/changeRequest");
const userHandler_1 = require("../users/userHandler");
const router = express_1.default.Router();
module.exports = router;
router.get("/staff", middleware_1.authenticate(userHandler_1.AllowedGroups.Admin), async (req, res) => {
    const staff = await adminHandler_1.getStaff();
    return httpResponses_1.returnCode(res, 200, "", staff);
});
router.get("/staff/:id", middleware_1.authenticate(userHandler_1.AllowedGroups.Admin), async (req, res) => {
    try {
        if (req.params.id.length < 12) {
            return httpResponses_1.returnCode(res, 400, "Invalid id");
        }
        const staff = await user_1.User.findById(req.params.id);
        if (staff == null) {
            return httpResponses_1.returnCode(res, 400, "Staff not found");
        }
        if (staff.admin) {
            return httpResponses_1.returnCode(res, 401);
        }
        return httpResponses_1.returnCode(res, 200, "Staff found", staff.sendableUser());
    }
    catch (err) {
        errorHandler_1.default(res, err);
    }
});
router.put("/staff/:id", 
/*authenticate(AllowedGroups.Admin),*/ async (req, res) => {
    try {
        if (req.params.id.length < 12) {
            return httpResponses_1.returnCode(res, 400, "Invalid id");
        }
        const staff = await user_1.User.findById(req.params.id);
        if (staff == null) {
            return httpResponses_1.returnCode(res, 400, "Staff not found");
        }
        if (staff.admin) {
            return httpResponses_1.returnCode(res, 401);
        }
        const modifiableInformation = [
            { name: "email", type: inputValidator_1.InputType.String },
            { name: "name", type: inputValidator_1.InputType.String },
            { name: "dob", type: inputValidator_1.InputType.Date },
        ];
        const valuesToChange = [];
        for (const info of modifiableInformation) {
            if (info.name in req.body) {
                const validationInfo = inputValidator_1.validateType(req.body[info.name], info.type);
                if (!validationInfo.passed) {
                    return httpResponses_1.returnCode(res, 400, info.name + " was not correctly formatted.");
                }
                if (validationInfo.modifiedValue != undefined)
                    req.body[info.name] = validationInfo.modifiedValue;
                valuesToChange.push({ name: info.name, value: req.body[info.name] });
            }
        }
        if (valuesToChange.length != 0) {
            const response = await adminHandler_1.updateStaff(staff, valuesToChange);
            if (response === true) {
                return httpResponses_1.returnCode(res, 200, "Staff updated.", staff.sendableUser());
            }
            else {
                return httpResponses_1.returnCode(res, 400, response + " was not correctly set.");
            }
        }
        else {
            return httpResponses_1.returnCode(res, 400, "No values to update were entered.");
        }
    }
    catch (err) {
        errorHandler_1.default(res, err);
    }
});
router.get("/pendingChangeRequests", middleware_1.authenticate(userHandler_1.AllowedGroups.Admin), async (req, res) => {
    const changeRequests = await changeRequest_1.ChangeRequest.find({});
    return httpResponses_1.returnCode(res, 200, "", changeRequests);
});
router.post("/closePendingRequest", middleware_1.authenticate(userHandler_1.AllowedGroups.Admin), inputValidator_1.validateInput([
    { name: "id", type: inputValidator_1.InputType.String },
    { name: "acceptRequest", type: inputValidator_1.InputType.Boolean },
]), async (req, res) => {
    if (req.body.id.length < 12) {
        return httpResponses_1.returnCode(res, 400, "Invalid id.");
    }
    const changeRequest = await changeRequest_1.ChangeRequest.findById(req.body.id);
    if (changeRequest == null) {
        return httpResponses_1.returnCode(res, 400, "Change request not found.");
    }
    if (req.body.acceptRequest) {
        // Update user here.
        const staff = await user_1.User.findById(changeRequest.staffId);
        const index = staff.days.findIndex((day) => day.start.getTime() == changeRequest.newDay.start.getTime());
        if (index == -1) {
            return httpResponses_1.returnCode(res, 500);
        }
        staff.days[index] = changeRequest.newDay;
        staff.save();
        changeRequest.remove();
        return httpResponses_1.returnCode(res, 200, "Applied change request.");
    }
    else {
        changeRequest.remove();
        return httpResponses_1.returnCode(res, 200, "Removed change request.");
    }
});
