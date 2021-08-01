/*
 * @Script: typeChecks.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:08:47
 * @Description: Contains specific type checks.
 */

import { validationResult, ValidationResult } from "../validateData";
import { stringToDate } from "./../otherValidation";
import { DataType, typeCheck } from "./../typeCheck";

export const checkDateType = (value: any): ValidationResult => {
	if (value instanceof Date) return validationResult(true, value);
	if (typeCheck(value, DataType.String).passed) {
		const dateValue = stringToDate(value);
		return validationResult(dateValue instanceof Date, dateValue);
	}
	return validationResult(false);
};

export const checkDayType = (value: any): ValidationResult => {
	if (typeof value === "object") {
		const startObject = typeCheck(value.start, DataType.Date);
		const endObject = typeCheck(value.end, DataType.Date);
		if (startObject.passed && endObject.passed) {
			value.start = startObject.value;
			value.end = endObject.value;

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

export const checkBreakType = (value: any): ValidationResult => {
	if (typeof value === "object") {
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
