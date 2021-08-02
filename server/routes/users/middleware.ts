/*
 * @Script: middleware.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-08 06:57:07
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-02 21:38:19
 * @Description: Contains the authentication middleware.
 */

import express from "express";

import { DataType, typeCheck } from "../../dataValidation/typeCheck";
import { existenceCheck } from "../../dataValidation/validateData";
import { clearSessionKey } from "./cookieHandler";
import { AllowedGroups, authenticateUser } from "./userHandler";

export { AllowedGroups } from "./userHandler";

/**
 * Middleware allowing only specific users to access the route.
 * @param allowedGroups The groups who can access this route.
 */
export const authenticate = (allowedGroups: AllowedGroups) => {
	return async function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (existenceCheck(req.signedCookies).passed) {
			if (typeCheck(req.signedCookies.sessionKey, DataType.String).passed) {
				// Check for cookie.
				// Pass on the the staffHandler authenticate.
				const user = await authenticateUser(
					req.signedCookies.sessionKey,
					allowedGroups
				);
				// If authenticate didn't fail send to the next middleware.
				if (user !== false) {
					res.locals.user = user;
					return next();
				}
			}
			// Remove client cookies and send response.
			clearSessionKey(res);
			return res.returnCode(401, "Authentication failed");
		}
	};
};
