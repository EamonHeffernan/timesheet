import { ValidationResult, validationResult } from "./validateData";

export const existenceCheck = (
	input: any,
	allowNull: boolean = false
): ValidationResult => {
	return validationResult(input !== undefined && (allowNull || input !== null));
};
