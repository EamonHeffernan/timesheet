/*
 * @Script: route.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-12 14:29:52
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-02 23:22:39
 * @Description: Handles the route for api/staff.
 */

import express from "express";

import { DataType, validateInput } from "../../dataValidation/validateInput";
import { IDay, IUser } from "../../model/user";
import { authenticate } from "../users/middleware";
import { AllowedGroups } from "../users/userHandler";
import { addDay, getDays } from "./staffHandler";

const router = express.Router();

module.exports = router;

router.get("/", authenticate(AllowedGroups.Staff), (req, res) => {
	const user: IUser = res.locals.user;
	// Return staff info.
	return res.returnCode(200, "", user.sendableUser());
});

router.post(
	"/submitDay",
	authenticate(AllowedGroups.Staff),
	validateInput([
		{ name: "day", level: "Reasonability", validDataType: "Day" },
	]),
	async (req, res) => {
		// Get day from body.
		const day = req.body.day as IDay;

		// Check if date is in the future by getting the current time
		// if it were in UTC time and checking against that.
		const d = new Date();
		const utcDate = new Date(
			Date.UTC(
				d.getFullYear(),
				d.getMonth(),
				d.getDate(),
				d.getHours(),
				d.getMinutes(),
				d.getSeconds(),
				d.getMilliseconds()
			)
		);
		if (
			day.start.getTime() > utcDate.getTime() ||
			day.end.getTime() > utcDate.getTime()
		) {
			return res.returnCode(400, "Date is in the future.");
		}
		// Get response from staffHandler.
		const response = await addDay(res.locals.user, day);
		return res.returnCode(200, response);
	}
);

router.get(
	"/days",
	authenticate(AllowedGroups.Staff),
	validateInput([
		{ name: "duration", level: "Type", dataType: DataType.Number },
	]),
	(req, res) => {
		// Max duration = 30.
		if (req.body.duration <= 30) {
			return res.returnCode(
				200,
				"",
				getDays(res.locals.user, req.body.duration)
			);
		}
		return res.returnCode(400, "Duration size is greater than allowed.");
	}
);
