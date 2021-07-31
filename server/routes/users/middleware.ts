import express from "express";

import { clearSessionKey } from "./cookieHandler";
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
				const user = await authenticateUser(
					req.signedCookies.sessionKey,
					allowedGroups
				);
				if (user !== false) {
					res.locals.user = user;
					return next();
				}
			}
		}
		clearSessionKey(res);
		return res.returnCode(401, "Authentication failed");
	};
};
