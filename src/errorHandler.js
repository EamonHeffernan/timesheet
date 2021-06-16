"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponses_1 = require("./httpResponses");
exports.default = (err, res = null) => {
    console.error(err);
    if (res != null)
        httpResponses_1.returnCode(res, 500);
    // Restarting server may go here.
};
//# sourceMappingURL=errorHandler.js.map