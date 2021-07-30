import express from "express";

import { DataType, emailInUse, InputData, validateBody, validateInput } from "../../dataValidation/validateInput";
import errorHandler from "../../errorHandler";
import { returnCode } from "../../httpResponses";
import { ChangeRequest } from "../../model/changeRequest";
import { User } from "../../model/user";
import { AllowedGroups, authenticate } from "../users/middleware";
import { getPendingChangeRequests, getStaff, updateStaff } from "./adminHandler";

const router = express.Router();

module.exports = router;

router.get("/staff", authenticate(AllowedGroups.Admin), async (req, res) => {
	const staff = await getStaff();
	return returnCode(res, 200, "", staff);
});

router.get(
	"/staff/:id",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		try {
			if (req.params.id.length < 12) {
				return returnCode(res, 400, "Invalid id");
			}
			const staff = await User.findById(req.params.id);
			if (staff == null) {
				return returnCode(res, 400, "Staff not found");
			}
			if (staff.admin) {
				return returnCode(res, 401);
			}
			return returnCode(res, 200, "Staff found", staff.sendableUser());
		} catch (err) {
			errorHandler(res, err);
		}
	}
);

router.put(
	"/staff/:id",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		try {
			const staff = await User.findById(req.params.id);
			if (staff == null) {
				return returnCode(res, 400, "Staff not found");
			}

			const modifiableInformation: InputData[] = [
				{ name: "email", level: "Format", format: "Email" },
				{ name: "name", level: "Format", format: "Name" },
				{ name: "dob", level: "Reasonability", validDataType: "DateOfBirth" },
			];

			const valuesToChange: { name: string; value: any }[] = [];

			for (const info of modifiableInformation) {
				const validationResult = validateBody(req, info);

				if (!validationResult.passed) {
					return returnCode(
						res,
						400,
						info.name + " was not correctly formatted."
					);
				}

				if (info.name === "email") {
					if (await emailInUse(req.body["email"])) {
						return returnCode(res, 400, "Email in use.");
					}
				}

				valuesToChange.push({
					name: info.name,
					value: req.body[info.name],
				});
			}
			if (valuesToChange.length != 0) {
				const response = updateStaff(staff, valuesToChange);
				if (response === true) {
					return returnCode(res, 200, "Staff updated.", staff.sendableUser());
				} else {
					return returnCode(res, 400, response + " was not correctly set.");
				}
			} else {
				return returnCode(res, 400, "No values to update were entered.");
			}
		} catch (err) {
			errorHandler(res, err);
		}
	}
);

router.get(
	"/pendingChangeRequests",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		const changeRequests = await getPendingChangeRequests();
		return returnCode(res, 200, "", changeRequests);
	}
);

router.post(
	"/resolveChangeRequest",
	authenticate(AllowedGroups.Admin),
	validateInput([
		{ name: "id", level: "Format", format: "Id" },
		{ name: "acceptRequest", level: "Type", dataType: DataType.Boolean },
	]),
	async (req, res) => {
		const changeRequest = await ChangeRequest.findById(req.body.id);
		if (changeRequest == null) {
			return returnCode(res, 400, "Change request not found.");
		}

		if (req.body.acceptRequest) {
			// Update user here.
			const staff = await User.findById(changeRequest.staffId);

			const index = staff.days.findIndex(
				(day) => day.start.getTime() == changeRequest.newDay.start.getTime()
			);
			if (index == -1) {
				return returnCode(res, 500);
			}
			staff.days[index] = changeRequest.newDay;
			staff.save();
			changeRequest.remove();
			return returnCode(res, 200, "Applied change request.");
		} else {
			changeRequest.remove();
			return returnCode(res, 200, "Removed change request.");
		}
	}
);
