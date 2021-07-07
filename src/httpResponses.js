"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnCode = void 0;
/**
 * Takes response information and formats and sends it
 * @param res res object from a router function
 * @param code Http response status code.
 * @param message String of message to send user. If blank will be set to the default message for the status code
 * @param data Json object of data to send
 * @returns Void
 */
const returnCode = (res, code, message = "", data = {}) => {
    let statusMessage = "";
    switch (code) {
        case 100:
            statusMessage = "CONTINUE";
            break;
        case 101:
            statusMessage = "SWITCHING PROTOCOLS";
            break;
        case 102:
            statusMessage = "PROCESSING";
            break;
        case 103:
            statusMessage = "EARLY HINTS";
            break;
        case 200:
            statusMessage = "OK";
            break;
        case 201:
            statusMessage = "CREATED";
            break;
        case 202:
            statusMessage = "ACCEPTED";
            break;
        case 203:
            statusMessage = "NON-AUTHORITATIVE INFORMATION";
            break;
        case 204:
            statusMessage = "NO CONTENT";
            break;
        case 205:
            statusMessage = "RESET CONTENT";
            break;
        case 206:
            statusMessage = "PARTIAL CONTENT";
            break;
        case 207:
            statusMessage = "MULTI-STATUS";
            break;
        case 208:
            statusMessage = "ALREADY REPORTED";
            break;
        case 226:
            statusMessage = "IM USED";
            break;
        case 300:
            statusMessage = "MULTIPLE CHOICES";
            break;
        case 301:
            statusMessage = "MOVED PERMANENTLY";
            break;
        case 302:
            statusMessage = "FOUND";
            break;
        case 303:
            statusMessage = "SEE OTHER";
            break;
        case 304:
            statusMessage = "NOT MODIFIED";
            break;
        case 307:
            statusMessage = "TEMPORARY REDIRECT";
            break;
        case 308:
            statusMessage = "PERMANENT REDIRECT";
            break;
        case 400:
            statusMessage = "BAD REQUEST";
            break;
        case 401:
            statusMessage = "UNAUTHORIZED";
            break;
        case 402:
            statusMessage = "PAYMENT REQUIRED";
            break;
        case 403:
            statusMessage = "FORBIDDEN";
            break;
        case 404:
            statusMessage = "NOT FOUND";
            break;
        case 405:
            statusMessage = "METHOD NOT ALLOWED";
            break;
        case 405:
            statusMessage = "NOT ACCEPTABLE";
            break;
        case 407:
            statusMessage = "PROXY AUTHENTICATION REQUIRED";
            break;
        case 408:
            statusMessage = "REQUEST TIMEOUT";
            break;
        case 409:
            statusMessage = "CONFLICT";
            break;
        case 410:
            statusMessage = "GONE";
            break;
        case 411:
            statusMessage = "LENGTH REQUIRED";
            break;
        case 412:
            statusMessage = "PRECONDITION FAILED";
            break;
        case 413:
            statusMessage = "PAYLOAD TOO LARGE";
            break;
        case 414:
            statusMessage = "URI TOO LONG";
            break;
        case 415:
            statusMessage = "UNSUPPORTED MEDIA TYPE";
            break;
        case 416:
            statusMessage = "RANGE NOT SATISFIABLE";
            break;
        case 417:
            statusMessage = "EXPECTATION FAILED";
            break;
        case 418:
            statusMessage = "I'M A TEAPOT";
            break;
        case 421:
            statusMessage = "MISDIRECTED REQUEST";
            break;
        case 422:
            statusMessage = "UNPROCESSABLE ENTITY";
            break;
        case 423:
            statusMessage = "LOCKED";
            break;
        case 424:
            statusMessage = "FAILED DEPENDENCY";
            break;
        case 425:
            statusMessage = "TOO EARLY";
            break;
        case 426:
            statusMessage = "UPGRADE REQUIRED";
            break;
        case 428:
            statusMessage = "PRECONDITION REQUIRED";
            break;
        case 429:
            statusMessage = "TOO MANY REQUESTS";
            break;
        case 431:
            statusMessage = "REQUEST HEADER FIELDS TOO LARGE";
            break;
        case 451:
            statusMessage = "UNAVAILABLE FOR LEGAL REASONS";
            break;
        case 500:
            statusMessage = "INTERNAL SERVER ERROR";
            break;
        case 501:
            statusMessage = "NOT IMPLEMENTED";
            break;
        case 502:
            statusMessage = "BAD GATEWAY";
            break;
        case 503:
            statusMessage = "SERVICE UNAVAILABLE";
            break;
        case 504:
            statusMessage = "GATEWAY TIMEOUT";
            break;
        case 505:
            statusMessage = "HTTP VERSION NOT SUPPORTED";
            break;
        case 506:
            statusMessage = "VARIANT ALSO NEGOTIATES";
            break;
        case 507:
            statusMessage = "INSUFFICIENT STORAGE";
            break;
        case 508:
            statusMessage = "LOOP DETECTED";
            break;
        case 510:
            statusMessage = "NOT EXTENDED";
            break;
        case 511:
            statusMessage = "CONTINUE";
            break;
        default:
            statusMessage = "NETWORK AUTHENTICATION REQUIRED";
            break;
    }
    if (message != "") {
        message = ": " + message;
    }
    let sendData = {
        statusCode: code,
        message: statusMessage + message,
        timeStamp: new Date().toUTCString(),
    };
    // Checks if there is data
    if (JSON.stringify(data) != JSON.stringify({})) {
        sendData.data = data;
    }
    return res.status(code).json(sendData);
};
exports.returnCode = returnCode;
//# sourceMappingURL=httpResponses.js.map