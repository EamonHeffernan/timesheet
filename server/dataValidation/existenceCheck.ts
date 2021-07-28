import { ValidationResult, validationResult } from "./validateData";

export default (input: any, allowNull: boolean = false): ValidationResult => {
	return validationResult(input !== undefined && (allowNull || input !== null));
};
