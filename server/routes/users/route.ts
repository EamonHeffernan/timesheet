import express from "express";
import errorHandler from "../../errorHandler";
import { returnCode } from "../../httpResponses";
import validateInput from "../../dataValidation/validateInput";
import { clearSessionKey, saveSessionKey } from "./cookieHandler";
import { signUp, signIn, AllowedGroups, signOut } from "./userHandler";
import { authenticate } from "./middleware";
import { DataType } from "../../dataValidation/typeCheck";

const router = express.Router();

module.exports = router;

router.post(
	"/signUp",
	validateInput([
		{ name: "email", level: "Format", type: "Email" },
		{ name: "name", level: "Format", type: "Name" },
		{ name: "password", level: "Format", type: "Password" },
	]),
	async (req, res) => {
		try {
			const response = await signUp(
				req.body.name,
				req.body.email,
				new Date(),
				req.body.password
			);
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return returnCode(
					res,
					200,
					"User created",
					response.user.sendableUser()
				);
			} else if ("error" in response) {
				return returnCode(res, 400, response.error);
			}
			return errorHandler(res, null, "An unknown error has occurred");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);

router.post(
	"/signIn",
	validateInput([
		{ name: "email", level: "Type", type: DataType.String },
		{ name: "password", level: "Type", type: DataType.String },
	]),
	async (req, res) => {
		try {
			// Validate existence and type here
			const response = await signIn(req.body.email, req.body.password);
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return returnCode(res, 200, "Signed in", response.user.sendableUser());
			} else if ("error" in response) {
				return returnCode(res, 400, response.error);
			}
			return errorHandler(res, null, "An unknown error has occurred");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);

router.post("/signOut", authenticate(AllowedGroups.Both), (req, res) => {
	signOut(res.locals.user);
	clearSessionKey(res);
	return returnCode(res, 200, "Signed out.");
});
