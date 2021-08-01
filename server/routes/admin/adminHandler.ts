/*
 * @Script: adminHandler.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-14 11:36:09
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:13:22
 * @Description: Receives and handles everything relating to admins.
 */

import { startOfDay } from "../../dataValidation/validateData";
import { ChangeRequest, IChangeRequest } from "../../model/changeRequest";
import { IUser, User } from "../../model/user";

/**
 * Get all staff. (admin = false)
 * @returns All staff in sendable form.
 */
export const getStaff = async () => {
	const staff = await User.find({ admin: false });
	const sendableStaff = [];
	for (const s of staff) {
		sendableStaff.push(s.sendableUser());
	}
	return sendableStaff;
};

/**
 * Update the staff with the given changes.
 * @param staff Staff to update
 * @param changes Changes to make
 * @returns Successful
 */
export const updateStaff = (
	staff: IUser,
	changes: { name: string; value: any }[]
): boolean => {
	for (const change of changes) {
		staff[change.name] = change.value;
	}
	staff.save();
	return true;
};

/**
 * Get all change requests, with populated staff objects
 * @returns Change Requests
 */
export const getPendingChangeRequests = async () => {
	return ChangeRequest.find({}).populate("staff").exec();
};

/**
 *
 * @param changeRequest The request to resolve.
 * @param acceptRequest Accept or decline request.
 * @returns Reason or null.
 */
export const resolveChangeRequest = async (
	changeRequest: IChangeRequest,
	acceptRequest
): Promise<string | null> => {
	// There are many throws here due to many pathways not are meant to happen
	// But it is better to handle them just in case.
	if (acceptRequest) {
		// Update user here.
		const staff = changeRequest.staff as IUser;

		if (staff == null) {
			throw "Staff not found for change request";
		}

		for (let i = 0; i < staff.days.length; i++) {
			if (
				startOfDay(staff.days[i].start).getTime() ==
				startOfDay(changeRequest.newDay.start).getTime()
			) {
				staff.days[i] = changeRequest.newDay;
				staff.save();
				changeRequest.remove();
				return "Applied change request.";
			}
		}
		changeRequest.remove();
		throw "Day not found for change request";
	} else {
		changeRequest.remove();
		return "Removed change request.";
	}
};
