import { User } from "../model/user";

export const emailInUse = async (email: string): Promise<boolean> => {
	return User.exists({ email: email });
};

export const validatePassword = (password: string): boolean => {
	return (
		password.length > 6 &&
		password.length < 64 &&
		password.toUpperCase() != password &&
		password.toLowerCase() != password &&
		hasNumber(password)
	);
};

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

export const validateEmail = (email: string) => {
	// Testing email structure via RegEx sourced from https://stackoverflow.com/a/201378
	return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
		email
	);
};

const hasNumber = (input: string): boolean => {
	return /\d/.test(input);
};
