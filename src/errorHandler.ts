import { Response } from "express";
import { returnCode } from "./httpResponses";

export default (err: Error, res: Response = null) => {
	console.error(err);
	if (res != null) returnCode(res, 500);
	// Restarting server may go here.
};
