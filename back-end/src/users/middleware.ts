import express from "express";
import { returnCode } from "../httpResponses";
import { IUser, User } from "../model/user";
import { authenticateUser } from "./userHandler";

export const authenticate = (staff: boolean, admin: boolean) => {
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
					if (authenticateUser(user, req.body.sessionKey, staff, admin)) {
						res.locals.user = user;
						return next();
					}
				}
			}
		}
		return returnCode(res, 401, "Authentication failed");
	};
};
