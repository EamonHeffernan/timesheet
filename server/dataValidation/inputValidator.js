"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateType = exports.validateInput = exports.InputType = void 0;
const dataValidator_1 = require("./dataValidator");
const httpResponses_1 = require("../httpResponses");
var InputType;
(function (InputType) {
    InputType["String"] = "string";
    InputType["Number"] = "number";
    InputType["Boolean"] = "boolean";
    InputType["Date"] = "date";
    InputType["Day"] = "day";
})(InputType = exports.InputType || (exports.InputType = {}));
const validateInput = (inputInfos) => {
    return function (req, res, next) {
        for (var i = 0; i < inputInfos.length; i++) {
            const inputInfo = inputInfos[i];
            if (!(inputInfo.name in req.body)) {
                return httpResponses_1.returnCode(res, 400, "Missing input: " + inputInfo.name + ".");
            }
            const validationResult = exports.validateType(req.body[inputInfo.name], inputInfo.type);
            if (!validationResult.passed) {
                return httpResponses_1.returnCode(res, 400, inputInfo.name +
                    " is the wrong type, expected " +
                    inputInfo.type +
                    ".");
            }
            if (validationResult.modifiedValue != undefined)
                req.body[inputInfo.name] = validationResult.modifiedValue;
        }
        return next();
    };
};
exports.validateInput = validateInput;
// Due to limitations with typescript, this can only check basic types or that I write a check for manually.
const validateType = (value, type) => {
    //Custom type testing
    switch (type) {
        case InputType.Date:
            if (typeof value == "string") {
                const newDate = dataValidator_1.stringToDate(value);
                if (newDate != null) {
                    return { passed: true, modifiedValue: newDate };
                }
                else {
                    return { passed: false };
                }
            }
            return { passed: false };
        case InputType.Day:
            const validationResult = exports.validateType(value, InputType.Date);
            if (!validationResult.passed) {
                return { passed: false };
            }
            if (validationResult.modifiedValue != undefined) {
                return {
                    passed: true,
                    modifiedValue: dataValidator_1.dateToDay(validationResult.modifiedValue),
                };
            }
            //Should not occur
            return { passed: false };
        default:
            return { passed: typeof value == type };
    }
};
exports.validateType = validateType;
