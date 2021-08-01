/*
 * @Script: logger.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 11:46:17
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:20:31
 * @Description: Handles the logging and saving of information.
 */

import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prod } from "./config";

// Get log levels from environment variables.
const fileLogLevel = parseInt(process.env.LOG_LEVEL) || 0;
const consoleLogLevel = parseInt(process.env.CONSOLE_LOG_LEVEL) || 0;

export enum LogLevel {
	Info,
	Warning,
	Error,
}

// Setting the prefixes to be saved with the messages per LogLevel.
const prefix: Record<LogLevel, string> = {
	0: "INFO",
	1: "WARN",
	2: "Error",
};

/**
 * Logs a given message to either the console, log file or both
 * depending on the logLevel set.
 * @param message message to log.
 * @param logLevel to log at.
 */
export default function logger(
	message: any,
	logLevel: LogLevel = LogLevel.Info
) {
	// Turn anything into string
	message = JSON.stringify(message);
	const timeStamp = `[${getTimestamp(false)}]`;
	// Generate console message.
	message = `${timeStamp} ${prefix[logLevel]}: ${message}`;
	if (logLevel >= consoleLogLevel) {
		// "\x1b[36m" and similar are colours
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
		// Reset colour.
		console.log("\x1b[0m");
	}
	if (logLevel >= fileLogLevel) {
		// write to log file.
		if (writeStream != null) {
			writeStream.write(message + "\n");
		}
	}

	if (logLevel === LogLevel.Error) {
		// Handler error
		// Possibly Restart Server
	}
}

/**
 * Error handling middleware for express.
 * On error, logs an error with logger and
 * sends a 500 to the client.
 * @param err Express error object
 * @param req Express request object
 * @param res Express response object
 * @param next Express nextFunction object
 * @returns void
 */
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

/**
 * Turn current time into timestamp that can be set as a
 * file name if required.
 * @param file Whether timestamp is needed as filename
 * @returns String containing timestamp.
 */
const getTimestamp = (file: boolean) => {
	// Get current time
	const d = new Date();

	// Get info from date.
	// Adding "" to the numbers
	// in order to transform into strings.
	// Padding so that 6 => 06
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

// Get path of log folder
const dir = path.join(__dirname, "../", "logs");

// If log folder does not exist create log folder.
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

// Open stream to write to.
const writeStream = prod
	? fs.createWriteStream(path.join(dir, `${getTimestamp(true)}.log`), {
			flags: "a",
	  })
	: null;
