import express from "express";
import { returnCode } from "../httpResponses";
import { Format } from "./formatCheck";
import { ValidDataType } from "./reasonabilityCheck";
import { DataType } from "./typeCheck";
import validateData, {
	ValidationData,
	ValidationLevel,
	ValidationResult,
} from "./validateData";

export interface InputData {
	name: any;
	level: ValidationLevel;
	type?: DataType | ValidDataType | Format;
}

export default (inputs: InputData[]) => {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		for (const input of inputs) {
			const value = req.body[input.name];
			const validationData: ValidationData = {
				value,
				level: input.level,
				type: input.type,
			};
			const result: ValidationResult = validateData(validationData);
			if (!result.passed) {
				return returnCode(res, 400, `${input.name} is not valid.`);
			}
			req.body[input.name] = result.value;
		}
		return next();
	};
};
