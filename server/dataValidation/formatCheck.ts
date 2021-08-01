/*
 * @Script: formatCheck.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:52:02
 * @Description: Performs format checks.
 */

import { validEmail, validId, validName, validPassword } from "./checks/formatChecks";
import { DataType, typeCheck } from "./typeCheck";
import { validationResult, ValidationResult } from "./validateData";

const noCheckImplemented = (input: any) => {
	console.warn("Check for a datatype was not implemented");
	return true;
};

export * from "./checks/formatChecks";
export type Format = "Email" | "Password" | "Name" | "Id";

interface FormatInfo {
	type: DataType;
	valid: (value: any) => ValidationResult;
}

const formats: Record<Format, FormatInfo> = {
	Email: { type: DataType.String, valid: validEmail },
	Password: { type: DataType.String, valid: validPassword },
	Name: { type: DataType.String, valid: validName },
	Id: { type: DataType.String, valid: validId },
};

/**
 * Check one value against the format.
 * @param value Value to check.
 * @param format Format value is required to be.
 * @returns ValidationResult
 */
export const formatCheck = (value: any, format: Format): ValidationResult => {
	if (!(format in formats)) {
		return validationResult(false);
	}
	const formatInfo = formats[format];

	const typeCheckResult = typeCheck(value, formatInfo.type);
	if (typeCheckResult.passed) {
		return formatInfo.valid(typeCheckResult.value);
	} else {
		return validationResult(false);
	}
};
