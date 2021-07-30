import { startOfDay } from "../../dataValidation/validateData";
import errorHandler from "../../errorHandler";
import { ChangeRequest, IChangeRequest } from "../../model/changeRequest";
import { IUser, User } from "../../model/user";

export const getStaff = async () => {
	const staff = await User.find({ admin: false });
	const sendableStaff = [];
	for (const s of staff) {
		sendableStaff.push(s.sendableUser());
	}
	return sendableStaff;
};

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

export const getPendingChangeRequests = async () => {
	return ChangeRequest.find({});
};

export const resolveChangeRequest = async (
	changeRequest: IChangeRequest,
	acceptRequest
): Promise<string | null> => {
	if (acceptRequest) {
		// Update user here.
		const staff = await User.findById(changeRequest.staffId);

		if (staff == null) {
			errorHandler(null, null, "Staff not found for change request");
			return null;
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
		//changeRequest.remove();
		errorHandler(null, null, "Day not found for change request");
		return null;
	} else {
		changeRequest.remove();
		return "Removed change request.";
	}
};
