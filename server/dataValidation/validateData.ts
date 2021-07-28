import existenceCheck from "./existenceCheck";
import formatCheck, { Format } from "./formatCheck";
import reasonabilityCheck, { ValidDataType } from "./reasonabilityCheck";
import typeCheck, { DataType } from "./typeCheck";

export type ValidationLevel = "Existence" | "Type" | "Format" | "Reasonability";

export interface ValidationData {
	value: any;
	level: ValidationLevel;
	type?: DataType | ValidDataType | Format;
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
			return typeCheck(input.value, input.type as DataType);
		case "Format":
			return formatCheck(input.value, input.type as Format);
		case "Reasonability":
			return reasonabilityCheck(input.value, input.type as ValidDataType);
	}
};

export const validationResult = (
	passed: boolean,
	value: any = undefined
): ValidationResult => {
	return { passed, value };
};
