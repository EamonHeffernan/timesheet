/*
 * @Script: db.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-16 12:44:02
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:35:06
 * @Description: The mongoose connection code.
 */

// Bring Mongoose into the app
import mongoose from "mongoose";

import { test } from "../config";
import logger from "../logger";
import errorHandler, { LogLevel } from "../logger";
import { User } from "./user";

const dbURI = process.env.DATABASEURI;

export const initMongoConnection = (): Promise<typeof mongoose> => {
	// Create the database connection
	if (dbURI) {
		const connectionPromise = mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
		});

		// CONNECTION EVENTS
		// When successfully connected
		mongoose.connection.on("connected", function () {
			logger("Mongoose connection open to " + dbURI);
			if (!test) {
				User.countDocuments({ admin: true }, (error, count) => {
					if (error) return errorHandler(error, LogLevel.Error);
					if (count === 0) {
						logger(
							"No admin account was found. Please manually add one to the database.",
							LogLevel.Warning
						);
					}
				});
			}
		});

		// If the connection throws an error
		mongoose.connection.on("error", function (err) {});

		// When the connection is disconnected
		mongoose.connection.on("disconnected", function () {});

		// If the Node process ends, close the Mongoose connection
		process.once("SIGINT", close("SIGINT"));

		// BRING IN SCHEMAS & MODELS
		require("./user");
		require("./changeRequest");

		return connectionPromise;
	} else {
		logger("Mongoose did not open a connection.", LogLevel.Error);
		return;
	}
};

const close = (code) => {
	return () => {
		mongoose.connection.close(() => {
			logger(
				"Mongoose default connection disconnected through app termination",
				LogLevel.Info
			);
			process.kill(process.pid, code);
		});
	};
};
