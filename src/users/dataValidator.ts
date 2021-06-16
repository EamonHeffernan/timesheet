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

const hasNumber = (input: string): boolean => {
	return /\d/.test(input);
};
