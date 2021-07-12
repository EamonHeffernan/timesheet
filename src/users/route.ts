import express from "express";
import errorHandler from "../errorHandler";
import { returnCode } from "../httpResponses";
import { validateInput, InputType } from "../dataValidation/inputValidator";
import { saveSessionKey } from "./cookieHandler";
import { signUp, signIn } from "./userHandler";

const router = express.Router();

module.exports = router;

router.post(
	"/signUp",
	validateInput([
		{ name: "email", type: InputType.String },
		{ name: "name", type: InputType.String },
		{ name: "password", type: InputType.String },
	]),
	async (req, res) => {
		try {
			// Validate existence and type here
			const response = await signUp(
				req.body.name,
				req.body.email,
				new Date(),
				req.body.password
			);
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return returnCode(res, 200, "User created", response.user);
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
		{ name: "email", type: InputType.String },
		{ name: "password", type: InputType.String },
	]),
	async (req, res) => {
		try {
			// Validate existence and type here
			const response = await signIn(req.body.email, req.body.password);
			if ("user" in response) {
				saveSessionKey(res, response.user.id, response.sessionKey);
				return returnCode(res, 200, "Signed in", response.user);
			} else if ("error" in response) {
				return returnCode(res, 400, response.error);
			}
			return errorHandler(res, null, "An unknown error has occurred");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);
