/*
 * @Script: validateData.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:50:02
 * @Description: Routes validation requests to the right targets.
 */

import { existenceCheck } from "./existenceCheck";
import { Format, formatCheck } from "./formatCheck";
import { reasonabilityCheck, ValidDataType } from "./reasonabilityCheck";
import { DataType, typeCheck } from "./typeCheck";

export * from "./existenceCheck";
export * from "./formatCheck";
export * from "./reasonabilityCheck";
export * from "./typeCheck";
export * from "./otherValidation";

export type ValidationLevel = "Existence" | "Type" | "Format" | "Reasonability";

export interface ValidationData {
	value: any;
	level: ValidationLevel;
	dataType?: DataType;
	format?: Format;
	validDataType?: ValidDataType;
}

export interface ValidationResult {
	passed: boolean;
	value?: any;
}

/**
 * Validate a single value.
 * @param input Data to validate.
 * @returns Results from validation.
 */
export default (input: ValidationData): ValidationResult => {
	switch (input.level) {
		case "Existence":
			return existenceCheck(input.value);
		case "Type":
			return typeCheck(input.value, input.dataType);
		case "Format":
			return formatCheck(input.value, input.format);
		case "Reasonability":
			return reasonabilityCheck(input.value, input.validDataType);
	}
};

/**
 * Function to build validationResults
 * @param passed Validation passed
 * @param value New value
 * @returns ValidationResult
 */
export const validationResult = (
	passed: boolean,
	value: any = undefined
): ValidationResult => {
	return { passed, value };
};
