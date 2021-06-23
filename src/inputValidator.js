"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = exports.InputType = void 0;
const httpResponses_1 = require("./httpResponses");
var InputType;
(function (InputType) {
    InputType["String"] = "string";
    InputType["Number"] = "number";
    InputType["Date"] = "date";
})(InputType = exports.InputType || (exports.InputType = {}));
const validateInput = (inputInfos) => {
    return function (req, res, next) {
        for (var i = 0; i < inputInfos.length; i++) {
            const inputInfo = inputInfos[i];
            if (!(inputInfo.name in req.body) ||
                !(typeof req.body[inputInfo.name] == inputInfo.type)) {
                return httpResponses_1.returnCode(res, 400, "Missing input: " + inputInfo.name + ".");
            }
        }
        return next();
    };
};
exports.validateInput = validateInput;
//# sourceMappingURL=inputValidator.js.map