/*
 * @Script: staffHandler.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-12 14:29:37
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 15:57:12
 * @Description: Handles adding and getting days.
 */

import { fullDaysSinceDate, startOfDay } from "../../dataValidation/otherValidation";
import { ChangeRequest } from "../../model/changeRequest";
import { IDay, IUser } from "../../model/user";

/**
 * Add a day to the staff member.
 * @param user The user that the day is being added to.
 * @param newDay The day being added to the user.
 * @returns String to return to the client.
 */
export const addDay = async (user: IUser, newDay: IDay): Promise<string> => {
	// Find if day already exists in the users existing days.
	for (const day of user.days) {
		// If new day is the same as day from array.
		if (
			startOfDay(day.start).getTime() === startOfDay(newDay.start).getTime()
		) {
			// Check through changeRequests for a change request on this day
			const pendingChangeRequests = await ChangeRequest.find({
				staff: user,
			});

			for (const request of pendingChangeRequests) {
				// If new day is the same as changeRequest from array.
				if (
					startOfDay(request.newDay.start).getTime() ===
					startOfDay(newDay.start).getTime()
				) {
					// Modify old changeRequest and save it.
					request.oldDay = request.newDay;
					request.newDay = newDay;
					request.save();
					return "Updated existing change request.";
				}
			}

			// Create new change Request and save it.
			const changeRequest = new ChangeRequest();
			changeRequest.staff = user;
			changeRequest.oldDay = day;
			changeRequest.newDay = newDay;
			changeRequest.save();

			return "Created new change request.";
		}
	}
	// No matching day was found. Creating new day.
	user.days.push(newDay);
	user.save();
	return "Saved new day.";
};

/**
 * Get all the days on a user that are less than duration.
 * @param user User to get days from.
 * @param duration Maximum age of days.
 * @returns Array of days.
 */
export const getDays = (user: IUser, duration: number) => {
	const days = user.days;
	let validDays: number = 0;

	for (var i = days.length - 1; i >= 0; i--) {
		const day = days[i];
		if (fullDaysSinceDate(day.start) < duration) {
			// Add to the valid days count.
			validDays++;
		} else {
			break;
		}
	}

	// Return subset of array with only validDays.
	if (validDays > 0) return days.slice(-validDays);
	// Otherwise return nothing.
	return [];
};
