/*
 * @Script: reasonabilityChecks.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:09:41
 * @Description: Contains specific reasonability tests.
 */

import { IBreak, IDay } from "../../model/user";
import { fullDaysSinceDate } from "../otherValidation";
import { reasonabilityCheck } from "../reasonabilityCheck";
import { validationResult, ValidationResult } from "../validateData";

/**
 * Check if value is a valid Break
 * @param value Value to check validity
 * @returns Validation Result
 */
export const validateBreak = (value: IBreak): ValidationResult => {
	if (fullDaysSinceDate(value.start) > 7 || fullDaysSinceDate(value.end) > 7) {
		return validationResult(false);
	}
	return validationResult(
		value.end.getTime() - value.start.getTime() > 0,
		value
	);
};

/**
 * Check if value is a valid Day
 * @param value Value to check validity
 * @returns Validation Result
 */
export const validateDay = (value: IDay): ValidationResult => {
	// Ensure day is recent.
	if (fullDaysSinceDate(value.start) > 7 || fullDaysSinceDate(value.end) > 7) {
		return validationResult(false);
	}
	// Set duration of day.
	let duration = value.end.getTime() - value.start.getTime();

	for (const b of value.breaks) {
		// Check all breaks.
		const checkResults = reasonabilityCheck(b, "Break");
		if (!checkResults.passed) {
			// If break fails the day fails.
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
		duration -= b.end.getTime() - b.start.getTime();
	}
	duration /= 60000;
	value.duration = duration;
	return validationResult(duration > 0, value);
};

/**
 * Check if value is a valid Date
 * @param value Value to check validity
 * @returns Validation Result
 */
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
