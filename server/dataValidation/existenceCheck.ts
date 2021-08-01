/*
 * @Script: existenceCheck.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:53:04
 * @Description: Performs an existence check.
 */

import { validationResult, ValidationResult } from "./validateData";

/**
 * Check if value exists.
 * @param value Value to check.
 * @param allowNull Allow null value to pass the check.
 * @returns Validation Result.
 */
export const existenceCheck = (
	value: any,
	allowNull: boolean = false
): ValidationResult => {
	return validationResult(value !== undefined && (allowNull || value !== null));
};
