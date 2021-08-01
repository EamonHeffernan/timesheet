/*
 * @Script: existenceCheck.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:08:29
 * @Description: Performs an existence check.
 */

import { validationResult, ValidationResult } from "./validateData";

export const existenceCheck = (
	input: any,
	allowNull: boolean = false
): ValidationResult => {
	return validationResult(input !== undefined && (allowNull || input !== null));
};
