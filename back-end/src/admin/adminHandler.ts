import {
	emailInUse,
	validateDate,
	validateEmail,
} from "../dataValidation/dataValidator";
import { validateType } from "../dataValidation/inputValidator";
import { User, IUser } from "../model/user";

export const getStaff = async () => {
	const staff = await User.find({ admin: false });
	const sendableStaff = [];
	for (const s of staff) {
		sendableStaff.push(s.sendableUser());
	}
	return sendableStaff;
};

export const updateStaff = async (
	staff: IUser,
	changes: { name: string; value: any }[]
) => {
	for (const change of changes) {
		if (change.name == "email") {
			if (!validateEmail(change.value) || (await emailInUse(change.value))) {
				return change.name;
			}
			change.value = change.value.toLowerCase();
		} else if (change.name == "name") {
		} else if (change.name == "dob") {
			const date = change.value;
			if (date != undefined && date != null) {
				if (!validateDate(date)) {
					return change.name;
				}
			}
		} else {
			return change.name;
		}
		staff[change.name] = change.value;
	}
	staff.save();
	return true;
};
