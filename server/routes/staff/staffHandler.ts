import { fullDaysSinceDate } from "../../dataValidation/otherValidation";
import { ChangeRequest } from "../../model/changeRequest";
import { Day, IBreak, IDay, IUser } from "../../model/user";

export const addDay = (user: IUser, day: IDay): boolean => {
	if (user.days == undefined) {
		user.days = [day];
	} else {
		const index = user.days.findIndex(
			(d) => d.start.getTime() == day.start.getTime()
		);
		if (index != -1) {
			const changeRequest = new ChangeRequest();
			changeRequest.staffId = user.id;
			changeRequest.newDay = user.days[index];
			changeRequest.save();
		} else {
			user.days.push(day);
		}
	}
	user.save();
	return true;
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
