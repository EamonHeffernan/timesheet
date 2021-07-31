import express from "express";

import { DataType, validateInput } from "../../dataValidation/validateInput";
import errorHandler from "../../errorHandler";
import { clearSessionKey, saveSessionKey } from "./cookieHandler";
import { authenticate } from "./middleware";
import {
	AllowedGroups,
	forgotPassword,
	resetPassword,
	signIn,
	signOut,
	signUp,
} from "./userHandler";

const router = express.Router();

module.exports = router;

router.post(
	"/signUp",
	validateInput([
		{ name: "email", level: "Format", format: "Name" },
		{ name: "name", level: "Format", format: "Name" },
	]),
	async (req, res) => {
		try {
			const response = await signUp(req.body.name, req.body.email, new Date());
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return res.returnCode(
					200,
					"User created",
					response.user.sendableUser()
				);
			} else if ("error" in response) {
				return res.returnCode(400, response.error);
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
		{ name: "email", level: "Format", format: "Email" },
		{ name: "password", level: "Type", dataType: DataType.String },
	]),
	async (req, res) => {
		try {
			// Validate existence and type here
			const response = await signIn(req.body.email, req.body.password);
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return res.returnCode(200, "Signed in", response.user.sendableUser());
			} else if ("error" in response) {
				return res.returnCode(400, response.error);
			}
			return errorHandler(res, null, "An unknown error has occurred");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);

router.post(
	"/forgotPassword",
	validateInput([{ name: "email", level: "Format", format: "Email" }]),
	async (req, res) => {
		try {
			if (await forgotPassword(req.body.email)) {
				return res.returnCode(200, "Email sent.");
			}
			return res.returnCode(400, "Email not found");
		} catch (error) {
			errorHandler(res, error);
		}
	}
);

router.post(
	"/resetPassword",
	validateInput([
		{ name: "key", level: "Type", dataType: DataType.String },
		{ name: "password", level: "Format", format: "Password" },
	]),
	async (req, res) => {
		try {
			if (await resetPassword(req.body.key, req.body.password)) {
				return res.returnCode(200, "Password set.");
			}
			return res.returnCode(400, "Key not found or expired");
		} catch (error) {
			errorHandler(res, error);
		}
	}
);

router.post("/signOut", authenticate(AllowedGroups.Both), (req, res) => {
	signOut(res.locals.user);
	clearSessionKey(res);
	return res.returnCode(200, "Signed out.");
});
