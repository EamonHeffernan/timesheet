import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const fileLogLevel = parseInt(process.env.LOG_LEVEL) || 0;
const consoleLogLevel = parseInt(process.env.CONSOLE_LOG_LEVEL) || 0;

export enum LogLevel {
	Info,
	Warning,
	Error,
}

const prefix: Record<LogLevel, string> = {
	0: "INFO",
	1: "WARN",
	2: "Error",
};

export default function logger(
	message: any,
	logLevel: LogLevel = LogLevel.Info
) {
	message = JSON.stringify(message);
	const timeStamp = `[${getTimestamp(false)}]`;
	message = `${timeStamp} ${prefix[logLevel]}: ${message}`;
	if (logLevel >= consoleLogLevel) {
		switch (logLevel) {
			case LogLevel.Info:
				console.log("\x1b[36m" + message);
				break;
			case LogLevel.Warning:
				console.warn("\x1b[33m" + message);
				break;
			case LogLevel.Error:
				console.error("\x1b[31m" + message);
				break;
		}
		console.log("\x1b[0m");
	}
	if (logLevel >= fileLogLevel) {
		writeStream.write(message + "\n");
	}

	if (logLevel === LogLevel.Error) {
		// Handler error
		// Possibly Restart Server
	}
}

export const errorCatcher = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.returnCode(500);
	logger(err, LogLevel.Error);
	return;
};

const getTimestamp = (file: boolean) => {
	const d = new Date();

	const day = (d.getDate() + "").padStart(2, "0");
	const month = (d.getMonth() + "").padStart(2, "0");
	const hour = (d.getHours() + "").padStart(2, "0");
	const minute = (d.getMinutes() + "").padStart(2, "0");
	const second = (d.getSeconds() + "").padStart(2, "0");

	if (file) {
		return `${day}-${month}_${hour}-${minute}-${second}`;
	} else {
		return `${day}/${month} ${hour}:${minute}:${second}`;
	}
};
const writeStream = fs.createWriteStream(
	path.join(__dirname, "../", "logs", `${getTimestamp(true)}.log`)
);
