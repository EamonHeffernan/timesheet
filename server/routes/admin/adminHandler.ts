import { ChangeRequest } from "../../model/changeRequest";
import { User, IUser } from "../../model/user";

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
