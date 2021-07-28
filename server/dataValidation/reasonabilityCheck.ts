import {
	validateDay,
	validateDate,
	validateBreak,
} from "./checks/reasonabilityChecks";
import typeCheck, { DataType } from "./typeCheck";
import { validationResult, ValidationResult } from "./validateData";

const noCheckImplemented = (input: any) => {
	return true;
};

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

export default (value: any, dataType: ValidDataType): ValidationResult => {
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
