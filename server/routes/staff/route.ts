import express from "express";
import { returnCode } from "../../httpResponses";
import { authenticate } from "../users/middleware";
import { addDay, getDays } from "./staffHandler";
import { IDay, IUser } from "../../model/user";
import { AllowedGroups } from "../users/userHandler";
import validateInput from "../../dataValidation/validateInput";
import { DataType } from "../../dataValidation/typeCheck";
import errorHandler from "../../errorHandler";

const router = express.Router();

module.exports = router;

router.get("/", authenticate(AllowedGroups.Staff), (req, res) => {
	try {
		const user: IUser = res.locals.user;
		return returnCode(res, 200, "", user.sendableUser());
	} catch (err) {
		return errorHandler(res, err);
	}
});

router.post(
	"/submitDay",
	authenticate(AllowedGroups.Staff),
	validateInput([{ name: "day", level: "Reasonability", type: "Day" }]),
	async (req, res) => {
		try {
			const day = req.body.day as IDay;
			if (addDay(res.locals.user, day)) {
				return returnCode(res, 200);
			} else {
				return returnCode(res, 400, "Day not formatted correctly");
			}
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);

router.get(
	"/days",
	authenticate(AllowedGroups.Staff),
	validateInput([{ name: "duration", level: "Type", type: DataType.Number }]),
	(req, res) => {
		try {
			if (req.body.duration <= 30)
				return returnCode(
					res,
					200,
					"",
					getDays(res.locals.user, req.body.duration)
				);
			return returnCode(res, 400, "Duration size is greater than allowed.");
		} catch (err) {
			return errorHandler(res, err);
		}
	}
);
