import express from "express";

declare global {
	namespace Express {
		export interface Response {
			returnCode?: (code: number, message?: string, data?: object) => void;
		}
	}
}

/**
 * Takes response information and formats and sends it
 * @param code Http response status code.
 * @param message String of message to send user. If blank will be set to the default message for the status code
 * @param data Json object of data to send
 * @returns Void
 */
express.response["returnCode"] = function (
	code: number,
	message: string = "",
	data: object = {}
): void {
	if (message != "") {
		message = ": " + message;
	}

	let sendData: any = {
		timeStamp: new Date().toUTCString(),
		statusCode: code,
		message: statusCodeToMessage(code) + message,
	};

	// Checks if there is data
	if (JSON.stringify(data) != JSON.stringify({})) {
		sendData.data = data;
	}

	return this.status(code).json(sendData);
};

const statusCodeToMessage = (code: number): string => {
	switch (code) {
		case 100:
			return "CONTINUE";

		case 101:
			return "SWITCHING PROTOCOLS";

		case 102:
			return "PROCESSING";

		case 103:
			return "EARLY HINTS";

		case 200:
			return "OK";

		case 201:
			return "CREATED";

		case 202:
			return "ACCEPTED";

		case 203:
			return "NON-AUTHORITATIVE INFORMATION";

		case 204:
			return "NO CONTENT";

		case 205:
			return "RESET CONTENT";

		case 206:
			return "PARTIAL CONTENT";

		case 207:
			return "MULTI-STATUS";

		case 208:
			return "ALREADY REPORTED";

		case 226:
			return "IM USED";

		case 300:
			return "MULTIPLE CHOICES";

		case 301:
			return "MOVED PERMANENTLY";

		case 302:
			return "FOUND";

		case 303:
			return "SEE OTHER";

		case 304:
			return "NOT MODIFIED";

		case 307:
			return "TEMPORARY REDIRECT";

		case 308:
			return "PERMANENT REDIRECT";

		case 400:
			return "BAD REQUEST";

		case 401:
			return "UNAUTHORIZED";

		case 402:
			return "PAYMENT REQUIRED";

		case 403:
			return "FORBIDDEN";

		case 404:
			return "NOT FOUND";

		case 405:
			return "METHOD NOT ALLOWED";

		case 405:
			return "NOT ACCEPTABLE";

		case 407:
			return "PROXY AUTHENTICATION REQUIRED";

		case 408:
			return "REQUEST TIMEOUT";

		case 409:
			return "CONFLICT";

		case 410:
			return "GONE";

		case 411:
			return "LENGTH REQUIRED";

		case 412:
			return "PRECONDITION FAILED";

		case 413:
			return "PAYLOAD TOO LARGE";

		case 414:
			return "URI TOO LONG";

		case 415:
			return "UNSUPPORTED MEDIA TYPE";

		case 416:
			return "RANGE NOT SATISFIABLE";

		case 417:
			return "EXPECTATION FAILED";

		case 418:
			return "I'M A TEAPOT";

		case 421:
			return "MISDIRECTED REQUEST";

		case 422:
			return "UNPROCESSABLE ENTITY";

		case 423:
			return "LOCKED";

		case 424:
			return "FAILED DEPENDENCY";

		case 425:
			return "TOO EARLY";

		case 426:
			return "UPGRADE REQUIRED";

		case 428:
			return "PRECONDITION REQUIRED";

		case 429:
			return "TOO MANY REQUESTS";

		case 431:
			return "REQUEST HEADER FIELDS TOO LARGE";

		case 451:
			return "UNAVAILABLE FOR LEGAL REASONS";

		case 500:
			return "INTERNAL SERVER ERROR";

		case 501:
			return "NOT IMPLEMENTED";

		case 502:
			return "BAD GATEWAY";

		case 503:
			return "SERVICE UNAVAILABLE";

		case 504:
			return "GATEWAY TIMEOUT";

		case 505:
			return "HTTP VERSION NOT SUPPORTED";

		case 506:
			return "VARIANT ALSO NEGOTIATES";

		case 507:
			return "INSUFFICIENT STORAGE";

		case 508:
			return "LOOP DETECTED";

		case 510:
			return "NOT EXTENDED";

		case 511:
			return "NETWORK AUTHENTICATION REQUIRED";

		default:
			return "";
	}
};
