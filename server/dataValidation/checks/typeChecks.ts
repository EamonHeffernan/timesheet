/*
 * @Script: typeChecks.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:07:18
 * @Description: Contains specific type checks.
 */

import { validationResult, ValidationResult } from "../validateData";
import { stringToDate } from "./../otherValidation";
import { DataType, typeCheck } from "./../typeCheck";

/**
 * Check values type for Date.
 * @param value Value to check type for date
 * @returns Validation Result
 */
export const checkDateType = (value: any): ValidationResult => {
	// Is value Date type.
	if (value instanceof Date) return validationResult(true, value);

	// Is value string that can be converted into Date.
	if (typeCheck(value, DataType.String).passed) {
		const dateValue = stringToDate(value);
		return validationResult(dateValue instanceof Date, dateValue);
	}
	return validationResult(false);
};

/**
 * Check values type for Day.
 * @param value Value to check type for day
 * @returns Validation Result
 */
export const checkDayType = (value: any): ValidationResult => {
	if (typeof value === "object") {
		// Check start and end for date.
		const startObject = typeCheck(value.start, DataType.Date);
		const endObject = typeCheck(value.end, DataType.Date);

		if (startObject.passed && endObject.passed) {
			value.start = startObject.value;
			value.end = endObject.value;

			// Check breaks if they exist.
			if (Array.isArray(value.breaks)) {
				for (let i = 0; i < value.breaks.length; i++) {
					const b = value.breaks[i];
					const breakObject = typeCheck(b, DataType.Break);
					if (!breakObject.passed) {
						return validationResult(false);
					}
					value.breaks[i] = breakObject.value;
				}
			} else {
				value.breaks = [];
			}
			return validationResult(true, value);
		}
	}
	return validationResult(false);
};

/**
 * Check values type for Break.
 * @param value Value to check type for break
 * @returns Validation Result
 */
export const checkBreakType = (value: any): ValidationResult => {
	if (typeof value === "object") {
		// Check start and end for Date.
		const startInfo = typeCheck(value.start, DataType.Date);
		const endInfo = typeCheck(value.end, DataType.Date);

		if (startInfo.passed && endInfo.passed) {
			if (
				(startInfo.value as Date).getTime() < (endInfo.value as Date).getTime()
			) {
				value.start = startInfo.value;
				value.end = endInfo.value;
				return validationResult(true, value);
			}
		}
	}
	return validationResult(false);
};
