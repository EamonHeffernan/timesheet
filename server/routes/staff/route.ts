import express from "express";

import { DataType, validateInput } from "../../dataValidation/validateInput";
import errorHandler from "../../errorHandler";
import { IDay, IUser } from "../../model/user";
import { authenticate } from "../users/middleware";
import { AllowedGroups } from "../users/userHandler";
import { addDay, getDays } from "./staffHandler";

const router = express.Router();

module.exports = router;

router.get("/", authenticate(AllowedGroups.Staff), (req, res) => {
	try {
		const user: IUser = res.locals.user;
		return res.returnCode(200, "", user.sendableUser());
	} catch (err) {
		return errorHandler(res, err);
	}
});

router.post(
	"/submitDay",
	authenticate(AllowedGroups.Staff),
	validateInput([
		{ name: "day", level: "Reasonability", validDataType: "Day" },
	]),
	async (req, res) => {
		try {
			const day = req.body.day as IDay;
			const response = await addDay(res.locals.user, day);
			return res.returnCode(200, response);
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);

router.get(
	"/days",
	authenticate(AllowedGroups.Staff),
	validateInput([
		{ name: "duration", level: "Type", dataType: DataType.Number },
	]),
	(req, res) => {
		try {
			if (req.body.duration <= 30)
				return res.returnCode(
					200,
					"",
					getDays(res.locals.user, req.body.duration)
				);
			return res.returnCode(400, "Duration size is greater than allowed.");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);
