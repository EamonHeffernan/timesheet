import { Response } from "express";

export default (
	res: Response = null,
	err: Error = null,
	message: string = ""
) => {
	if (err) {
		console.error(err);
	}
	if (message != "") {
		throw "ERROR: " + message;
	}

	if (res != null) res["returnCode"](500, message);
	// Restarting server may go here.
};
