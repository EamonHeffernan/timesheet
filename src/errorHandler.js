"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponses_1 = require("./httpResponses");
exports.default = (res = null, err = null, message = "") => {
    if (err) {
        console.error(err);
    }
    if (message != "") {
        console.error(message);
    }
    if (res != null)
        httpResponses_1.returnCode(res, 500, message);
    // Restarting server may go here.
};
//# sourceMappingURL=errorHandler.js.map