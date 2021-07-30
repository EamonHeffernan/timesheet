import { checkBreakType, checkDateType, checkDayType } from "./checks/typeChecks";
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

export const typeCheck = (value: any, dataType: DataType): ValidationResult => {
	if (!existenceCheck(value)) {
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
