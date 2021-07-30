import express from "express";

import { IUser, User } from "../../model/user";
import { AllowedGroups, authenticateUser } from "./userHandler";

export { AllowedGroups } from "./userHandler";

export const authenticate = (allowedGroups: AllowedGroups) => {
	return async function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if ("sessionKey" in req.signedCookies) {
			if (typeof req.signedCookies.sessionKey == "string") {
				const user: IUser = await User.findOne({
					sessionKey: req.signedCookies.sessionKey,
				});
				if (user != null) {
					if (
						authenticateUser(user, req.signedCookies.sessionKey, allowedGroups)
					) {
						res.locals.user = user;
						return next();
					}
				}
			}
		}
		return res.returnCode(401, "Authentication failed");
	};
};
