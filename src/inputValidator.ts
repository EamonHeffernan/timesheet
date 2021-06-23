import express = require("express");
import { returnCode } from "./httpResponses";

export enum InputType {
	String = "string",
	Number = "number",
	Date = "date",
}

export interface InputInfo {
	name: string;
	type: InputType;
}

export const validateInput = (inputInfos: InputInfo[]) => {
	return function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		for (var i = 0; i < inputInfos.length; i++) {
			const inputInfo = inputInfos[i];
			if (
				!(inputInfo.name in req.body) ||
				!(typeof req.body[inputInfo.name] == inputInfo.type)
			) {
				return returnCode(res, 400, "Missing input: " + inputInfo.name + ".");
			}
		}
		return next();
	};
};
