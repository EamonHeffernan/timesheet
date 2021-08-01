/*
 * @Script: otherValidation.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:07:57
 * @Description: Holds functions that are related to data validation.
 */

import { User } from "../model/user";

export const emailInUse = async (email: string): Promise<boolean> => {
	return User.exists({ email: email });
};

export const stringToDate = (input: string): Date => {
	if (
		//Validating the string's format
		/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/.test(
			input
		)
	) {
		const newDate = new Date(input);
		return newDate;
	}
	return null;
};

export const fullDaysSinceDate = (input: Date): number => {
	const dayDuration = 1000 * 60 * 60 * 24;
	const timeNow = new Date();
	const difference = timeNow.getTime() - input.getTime();
	return Math.floor(difference / dayDuration);
};

export const startOfDay = (input: Date): Date => {
	const newDate = new Date(input.getTime());
	newDate.setHours(0, 0, 0, 0);
	return newDate;
};
