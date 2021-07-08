import express = require("express");
import { returnCode } from "../httpResponses";
import { IUser, User } from "../model/user";
import { verifySessionKey } from "./userHandler";

export const authenticate = async (admin: boolean) => {
	return async function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if ("accountId" in req.body && "sessionKey" in req.body) {
			if (
				typeof req.body.accountId == "string" &&
				typeof req.body.sessionKey == "string"
			) {
				const user: IUser = await User.findById(req.body.accountId);
				if (user != null) {
					if (user.admin == admin) {
						if (verifySessionKey(req.body.sessionKey, user)) {
							res.locals.user = user;
							next();
						}
					}
				}
			}
		}
		return returnCode(res, 404, "Authentication failed");
	};
};
