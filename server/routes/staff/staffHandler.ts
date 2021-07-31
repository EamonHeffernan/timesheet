import {
	fullDaysSinceDate,
	startOfDay,
} from "../../dataValidation/otherValidation";
import { ChangeRequest } from "../../model/changeRequest";
import { IDay, IUser } from "../../model/user";

export const addDay = async (user: IUser, newDay: IDay): Promise<string> => {
	for (const day of user.days) {
		if (
			startOfDay(day.start).getTime() === startOfDay(newDay.start).getTime()
		) {
			const pendingChangeRequests = await ChangeRequest.find({
				staff: user,
			});
			for (const request of pendingChangeRequests) {
				if (
					startOfDay(request.newDay.start).getTime() ===
					startOfDay(newDay.start).getTime()
				) {
					request.oldDay = request.newDay;
					request.newDay = newDay;
					request.save();
					return "Updated existing change request.";
				}
			}
			const changeRequest = new ChangeRequest();
			changeRequest.staff = user;
			changeRequest.oldDay = day;
			changeRequest.newDay = newDay;
			changeRequest.save();
			return "Created new change request.";
		}
	}
	user.days.push(newDay);
	user.save();
	return "Saved new day.";
};

export const getDays = (user: IUser, duration: number) => {
	const days = user.days;
	let validDays: number = 0;
	for (var i = days.length - 1; i >= 0; i--) {
		const day = days[i];
		if (fullDaysSinceDate(day.start) < duration) {
			validDays++;
		} else {
			break;
		}
	}
	if (validDays > 0) return days.slice(-validDays);
	return [];
};
