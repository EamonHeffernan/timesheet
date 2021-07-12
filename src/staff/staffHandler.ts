import { dateToDay, fullDaysSinceDate } from "../dataValidation/dataValidator";
import { IUser } from "../model/user";

export const addDay = (
	user: IUser,
	start: Date,
	end: Date,
	breaks: Array<any>
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
		const day = {
			start: start,
			end: end,
			breaks: breaks,
			duration: duration,
		};
		if (user.days == undefined) {
			user.days = [day];
		} else {
			user.days.push(day);
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
