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

export const validationResult = (
	passed: boolean,
	value: any = undefined
): ValidationResult => {
	return { passed, value };
};
