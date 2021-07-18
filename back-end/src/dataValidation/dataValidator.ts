import { User } from "../model/user";

export const emailInUse = async (email: string): Promise<boolean> => {
	return User.exists({ email: email });
};

export const validatePassword = (password: string): boolean => {
	return (
		password.length >= 8 &&
		password.length <= 72 &&
		password.toUpperCase() != password &&
		password.toLowerCase() != password &&
		stringHasNumber(password)
	);
};

export const validateEmail = (email: string) => {
	// Testing email structure via RegEx sourced from https://stackoverflow.com/a/201378
	return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
		email
	);
};

const stringHasNumber = (input: string): boolean => {
	return /\d/.test(input);
};

// Date Validation
export const validateDate = (
	date: Date,
	maxYears: number = 120,
	minYears: number = 13
): boolean => {
	const difference = date.getTime() - new Date().getTime();
	const newDate = new Date(difference);
	const yearDifference = Math.abs(newDate.getUTCFullYear() - 1970);
	return yearDifference >= minYears && yearDifference <= maxYears;
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

export const fullDaysSinceDate = (date: Date): number => {
	const dayDuration = 1000 * 60 * 60 * 24;
	const timeNow = dateToDay(new Date());
	const difference = timeNow.getTime() - date.getTime();
	return Math.floor(difference / dayDuration);
};

export const dateToDay = (date: Date): Date => {
	date.setUTCHours(0, 0, 0, 0);
	return date;
};
