import express = require("express");
import { returnCode } from "../httpResponses";
import { User } from "../model/user";
import { verifySessionKey } from "./userHandler";

export const authenticate = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if ("accountId" in req.body && "sessionKey" in req.body) {
		if (
			typeof req.body.accountId == "string" &&
			typeof req.body.sessionKey == "string"
		) {
			const user = await User.findById(req.body.accountId);
			if (user != null) {
				res.locals.user = user;
				if (verifySessionKey(user, req.body.sessionKey)) {
					next();
				}
			}
		}
	}
	return returnCode(res, 404, "Authentication failed");
};
