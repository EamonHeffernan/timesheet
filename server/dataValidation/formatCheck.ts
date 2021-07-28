import {
	validEmail,
	validId,
	validName,
	validPassword,
} from "./checks/formatChecks";
import typeCheck, { DataType } from "./typeCheck";
import { validationResult, ValidationResult } from "./validateData";

const noCheckImplemented = (input: any) => {
	console.warn("Check for a datatype was not implemented");
	return true;
};

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

export default (value: any, format: Format): ValidationResult => {
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
