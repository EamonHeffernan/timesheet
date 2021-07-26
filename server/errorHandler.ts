import { Response } from "express";
import { returnCode } from "./httpResponses";

export default (
	res: Response = null,
	err: Error = null,
	message: string = ""
) => {
	if (err) {
		console.error(err);
	}
	if (message != "") {
		console.error(message);
		throw message;
	}

	if (res != null) returnCode(res, 500, message);
	// Restarting server may go here.
};
