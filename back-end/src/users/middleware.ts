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
		console.log(req.cookies);
		if ("accountId" in req.cookies && "sessionKey" in req.cookies) {
			if (
				typeof req.cookies.accountId == "string" &&
				typeof req.cookies.sessionKey == "string"
			) {
				const user: IUser = await User.findById(req.cookies.accountId);
				if (user != null) {
					if (authenticateUser(user, req.cookies.sessionKey, staff, admin)) {
						res.locals.user = user;
						return next();
					}
				}
			}
		}
		return returnCode(res, 401, "Authentication failed");
	};
};
