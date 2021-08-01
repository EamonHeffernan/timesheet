/*
 * @Script: reasonabilityCheck.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:51:41
 * @Description: Performs reasonability tests.
 */

import { validateBreak, validateDate, validateDay } from "./checks/reasonabilityChecks";
import { DataType, typeCheck } from "./typeCheck";
import { validationResult, ValidationResult } from "./validateData";

export * from "./checks/reasonabilityChecks";
export type ValidDataType = "DateOfBirth" | "Day" | "Break";

interface ValidDataInfo {
	type: DataType;
	valid: (value: any) => ValidationResult;
}

const dataTypes: Record<ValidDataType, ValidDataInfo> = {
	DateOfBirth: { type: DataType.Date, valid: validateDate(13, 120) },
	Day: { type: DataType.Day, valid: validateDay },
	Break: { type: DataType.Break, valid: validateBreak },
};

/**
 * Check one value against the dataType.
 * @param value Value to check.
 * @param dataType Type value is required to be.
 * @returns ValidationResult
 */
export const reasonabilityCheck = (
	value: any,
	dataType: ValidDataType
): ValidationResult => {
	if (!(dataType in dataTypes)) {
		return validationResult(false);
	}
	const dataInfo = dataTypes[dataType];

	const typeCheckResult = typeCheck(value, dataInfo.type);
	if (typeCheckResult.passed) {
		return dataInfo.valid(typeCheckResult.value);
	}
	return typeCheckResult;
};
