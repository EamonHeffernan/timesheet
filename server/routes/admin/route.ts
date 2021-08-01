/*
 * @Script: route.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-14 11:36:19
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 16:45:55
 * @Description: Handles the route for api/admin.
 */

import express from "express";

import { DataType, emailInUse, InputData, validateBody, validateInput } from "../../dataValidation/validateInput";
import { ChangeRequest } from "../../model/changeRequest";
import { User } from "../../model/user";
import { AllowedGroups, authenticate } from "../users/middleware";
import { getPendingChangeRequests, getStaff, resolveChangeRequest, updateStaff } from "./adminHandler";

const router = express.Router();

module.exports = router;

router.get("/staff", authenticate(AllowedGroups.Admin), async (req, res) => {
	const staff = await getStaff();
	return res.returnCode(200, "", staff);
});

router.get(
	"/staff/:id",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		// Id is part of request url
		// ex. api/admin/staff/12345678901234567890

		if (req.params.id.length < 12) {
			return res.returnCode(400, "Invalid id");
		}

		const staff = await User.findById(req.params.id);

		if (staff == null) {
			return res.returnCode(400, "Staff not found");
		}
		// Admins cannot view other admins
		if (staff.admin) {
			return res.returnCode(401);
		}

		return res.returnCode(200, "Staff found", staff.sendableUser());
	}
);

// Update staff member
router.put(
	"/staff/:id",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		// Get staff from id
		const staff = await User.findById(req.params.id);
		if (staff == null) {
			return res.returnCode(400, "Staff not found");
		}

		// Set up information to be validated.
		const modifiableInformation: InputData[] = [
			{ name: "email", level: "Format", format: "Email" },
			{ name: "name", level: "Format", format: "Name" },
			{ name: "dob", level: "Reasonability", validDataType: "DateOfBirth" },
		];

		const valuesToChange: { name: string; value: any }[] = [];

		for (const info of modifiableInformation) {
			// Validate all info.
			const validationResult = validateBody(req, info);

			if (!validationResult.passed) {
				return res.returnCode(400, info.name + " was not correctly formatted.");
			}

			// Specific check for email.
			if (info.name === "email") {
				if (await emailInUse(req.body["email"])) {
					return res.returnCode(400, "Email in use.");
				}
			}

			// Add correct value to values to change.
			valuesToChange.push({
				name: info.name,
				value: req.body[info.name],
			});
		}
		// If values have been set
		if (valuesToChange.length != 0) {
			// Update staff with new values.
			const response = updateStaff(staff, valuesToChange);
			if (response === true) {
				return res.returnCode(200, "Staff updated.", staff.sendableUser());
			} else {
				return res.returnCode(400, response + " was not correctly set.");
			}
		} else {
			return res.returnCode(400, "No values to update were entered.");
		}
	}
);

// Get all change requests.
router.get(
	"/pendingChangeRequests",
	authenticate(AllowedGroups.Admin),
	async (req, res) => {
		const changeRequests = await getPendingChangeRequests();
		return res.returnCode(200, "", changeRequests);
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
		// Populate staff field
		const changeRequest = await (await ChangeRequest.findById(req.body.id))
			.populate("staff")
			.execPopulate();

		if (changeRequest == null) {
			return res.returnCode(400, "Change request not found.");
		}

		// Resolve in admin handler
		const result = await resolveChangeRequest(
			changeRequest,
			req.body.acceptRequest
		);
		if (result != null) {
			return res.returnCode(200, result);
		}
	}
);
