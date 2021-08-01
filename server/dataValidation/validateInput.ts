/*
 * @Script: validateInput.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:05:31
 * @Description: Middleware for validating request bodies.
 */

import express from "express";

import validateData, { ValidationData, ValidationResult } from "./validateData";

export * from "./validateData";
export interface InputData extends Omit<ValidationData, "value"> {
	name: any;
}

export const validateInput = (inputs: InputData[]) => {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		for (const input of inputs) {
			const result = validateBody(req, input);
			if (!result.passed) {
				return res.returnCode(400, `${input.name} is not valid.`);
			}
		}
		return next();
	};
};

export const validateBody = (
	req: express.Request,
	inputData: InputData
): ValidationResult => {
	const value = req.body[inputData.name];
	const validationData: ValidationData = { ...inputData, ...{ value } };
	const result: ValidationResult = validateData(validationData);

	if (result.passed) {
		req.body[inputData.name] = result.value;
	}
	return result;
};
