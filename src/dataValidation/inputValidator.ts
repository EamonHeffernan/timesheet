import * as express from "express";
import { dateToDay, stringToDate } from "./dataValidator";
import { returnCode } from "../httpResponses";

export enum InputType {
	String = "string",
	Number = "number",
	Boolean = "boolean",
	Date = "date",
	Day = "day",
}

export interface InputInfo {
	name: string;
	type: InputType;
}

export interface ValidationResult {
	passed: boolean;
	modifiedValue?: any;
}

export const validateInput = (inputInfos: InputInfo[]) => {
	return function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		for (var i = 0; i < inputInfos.length; i++) {
			const inputInfo = inputInfos[i];
			if (!(inputInfo.name in req.body)) {
				return returnCode(res, 400, "Missing input: " + inputInfo.name + ".");
			}
			const validationResult: ValidationResult = validateType(
				req.body[inputInfo.name],
				inputInfo.type
			);
			if (!validationResult.passed) {
				return returnCode(
					res,
					400,
					inputInfo.name +
						" is the wrong type, expected " +
						inputInfo.type +
						"."
				);
			}
			if (validationResult.modifiedValue != undefined)
				req.body[inputInfo.name] = validationResult.modifiedValue;
		}
		return next();
	};
};

// Due to limitations with typescript, this can only check basic types or that I write a check for manually.
export const validateType = (value: any, type: InputType): ValidationResult => {
	//Custom type testing
	switch (type) {
		case InputType.Date:
			if (typeof value == "string") {
				const newDate = stringToDate(value);
				if (newDate != null) {
					return { passed: true, modifiedValue: newDate };
				} else {
					return { passed: false };
				}
			}
			return { passed: false };
		case InputType.Day:
			const validationResult: ValidationResult = validateType(
				value,
				InputType.Date
			);
			if (!validationResult.passed) {
				return { passed: false };
			}
			if (validationResult.modifiedValue != undefined) {
				return {
					passed: true,
					modifiedValue: dateToDay(validationResult.modifiedValue),
				};
			}

			//Should not occur
			return { passed: false };
		default:
			return { passed: typeof value == type };
	}
};
