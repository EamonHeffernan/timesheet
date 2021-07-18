import { dateToDay, fullDaysSinceDate } from "../dataValidation/dataValidator";
import { ChangeRequest } from "../model/changeRequest";
import { Day, IBreak, IDay, IUser } from "../model/user";

export const addDay = (
	user: IUser,
	start: Date,
	end: Date,
	breaks: Array<IBreak>
): boolean => {
	// TODO: Update old day if day is in array, while maintaining order.
	let duration = (end.getTime() - start.getTime()) / 1000;

	if (duration > 0) {
		for (let i = 0; i < breaks.length; i++) {
			const breakDuration =
				(breaks[i].end.getTime() - breaks[i].start.getTime()) / 1000;
			if (breakDuration <= 0) {
				duration -= breakDuration;
				return false;
			}
		}
		const day: IDay = new Day();

		day.start = start;
		day.end = end;
		day.breaks = breaks;
		day.duration = duration;

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
	}
	return false;
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
