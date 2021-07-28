import {
	fullDaysSinceDate,
	startOfDay,
} from "../../dataValidation/otherValidation";
import { ChangeRequest } from "../../model/changeRequest";
import { IDay, IUser } from "../../model/user";

export const addDay = async (user: IUser, day: IDay): Promise<boolean> => {
	if (user.days == undefined) {
		user.days = [day];
	} else {
		const index = user.days.findIndex(
			(d) => startOfDay(d.start).getTime() == startOfDay(day.start).getTime()
		);
		if (index != -1) {
			const currentChangeRequests = await ChangeRequest.find({
				staffId: user.id,
			});
			for (const request of currentChangeRequests) {
				if (
					startOfDay(request.newDay.start).getTime() ===
					startOfDay(day.start).getTime()
				) {
					request.newDay = day;
					request.save();
					return true;
				}
			}

			const changeRequest = new ChangeRequest();
			changeRequest.staffId = user.id;
			changeRequest.newDay = day;
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
