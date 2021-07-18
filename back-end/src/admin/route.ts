import express from "express";
import errorHandler from "../errorHandler";
import { returnCode } from "../httpResponses";
import { sendableUser, User } from "../model/user";
import { authenticate } from "../users/middleware";
import { getStaff, updateStaff } from "./adminHandler";
import {
	InputInfo,
	InputType,
	validateInput,
	validateType,
} from "../dataValidation/inputValidator";
import { ChangeRequest } from "../model/changeRequest";

const router = express.Router();

module.exports = router;

router.get("/staff", authenticate(false, true), async (req, res) => {
	const staff = await getStaff();
	return returnCode(res, 200, "", staff);
});

router.get("/staff/:id", authenticate(false, true), async (req, res) => {
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
		return returnCode(res, 200, "Staff found", sendableUser(staff));
	} catch (err) {
		errorHandler(res, err);
	}
});

router.put(
	"/staff/:id",
	/*authenticate(false, true),*/ async (req, res) => {
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

			const modifiableInformation: InputInfo[] = [
				{ name: "email", type: InputType.String },
				{ name: "name", type: InputType.String },
				{ name: "dob", type: InputType.Date },
			];

			const valuesToChange: { name: string; value: any }[] = [];

			for (const info of modifiableInformation) {
				if (info.name in req.body) {
					const validationInfo = validateType(req.body[info.name], info.type);
					if (!validationInfo.passed) {
						return returnCode(
							res,
							400,
							info.name + " was not correctly formatted."
						);
					}
					if (validationInfo.modifiedValue != undefined)
						req.body[info.name] = validationInfo.modifiedValue;
					valuesToChange.push({ name: info.name, value: req.body[info.name] });
				}
			}
			if (valuesToChange.length != 0) {
				const response = await updateStaff(staff, valuesToChange);
				if (response === true) {
					return returnCode(res, 200, "Staff updated.", sendableUser(staff));
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
	authenticate(false, true),
	async (req, res) => {
		const changeRequests = await ChangeRequest.find({});
		return returnCode(res, 200, "", changeRequests);
	}
);

router.post(
	"/closePendingRequest",
	authenticate(false, true),
	validateInput([
		{ name: "id", type: InputType.String },
		{ name: "acceptRequest", type: InputType.Boolean },
	]),
	async (req, res) => {
		if (req.body.id.length < 12) {
			return returnCode(res, 400, "Invalid id.");
		}
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
