/*
 * @Script: typeCheck.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:59:55
 * @Description: Performs type checks.
 */
import {
	checkBreakType,
	checkDateType,
	checkDayType,
} from "./checks/typeChecks";
import { existenceCheck } from "./existenceCheck";
import { validationResult, ValidationResult } from "./validateData";

export * from "./checks/typeChecks";
export enum DataType {
	String = "string",
	Boolean = "boolean",
	Number = "number",
	Date = "date",
	Day = "day",
	Break = "break",
}
/**
 * Check one value against the type.
 * @param value Value to check.
 * @param dataType Type value is required to be.
 * @returns ValidationResult
 */
export const typeCheck = (value: any, dataType: DataType): ValidationResult => {
	if (!existenceCheck(value).passed) {
		return validationResult(false);
	}
	switch (dataType) {
		case DataType.Date:
			return checkDateType(value);
		case DataType.Day:
			return checkDayType(value);
		case DataType.Break:
			return checkBreakType(value);
		default:
			return validationResult(typeof value === dataType, value);
	}
};
