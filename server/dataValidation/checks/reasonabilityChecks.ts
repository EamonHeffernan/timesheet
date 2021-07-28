import { IBreak, IDay } from "../../model/user";
import { fullDaysSinceDate } from "../otherValidation";
import reasonabilityCheck from "../reasonabilityCheck";
import { validationResult, ValidationResult } from "../validateData";

export const validateBreak = (value: IBreak): ValidationResult => {
	if (fullDaysSinceDate(value.start) > 7 || fullDaysSinceDate(value.end) > 7) {
		return validationResult(false);
	}
	return validationResult(
		value.end.getTime() - value.start.getTime() > 0,
		value
	);
};

export const validateDay = (value: IDay): ValidationResult => {
	if (fullDaysSinceDate(value.start) > 7 || fullDaysSinceDate(value.end) > 7) {
		return validationResult(false);
	}
	let duration = (value.end.getTime() - value.start.getTime()) / 1000;
	value.duration = duration;

	for (const b of value.breaks) {
		const checkResults = reasonabilityCheck(b, "Break");
		if (!checkResults.passed) {
			return validationResult(false);
		}
		b.start = checkResults.value.start;
		b.end = checkResults.value.end;

		if (
			b.start.getTime() <= value.start.getTime() ||
			b.end.getTime() >= value.end.getTime()
		) {
			return validationResult(false);
		}
	}
	return validationResult(duration > 0, value);
};

// Date Validation
export const validateDate = (min: number = 13, max: number = 120) => {
	return (value: Date): ValidationResult => {
		const difference = value.getTime() - new Date().getTime();
		const newDate = new Date(difference);
		const yearDifference = Math.abs(newDate.getUTCFullYear() - 1970);
		return validationResult(
			yearDifference >= min && yearDifference <= max,
			value
		);
	};
};
