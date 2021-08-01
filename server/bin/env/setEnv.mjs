#! /usr/bin/env node
/*
 * @Script: setEnv.mjs
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-26 17:04:43
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:17:13
 * @Description: Sets environment variables and runs startUp, before running as normal.
 */

import shell from "shelljs";

const [, , ...processArgs] = process.argv;

// Set base env vars.
const config = {
	development: {
		NODE_ENV: "development",
		DATABASEURI: "localhost:27017/timesheet",
		COOKIE_SECRET: "DEVELOPMENTCOOKIESECRET",
		LOG_LEVEL: "2",
		CONSOLE_LOG_LEVEL: "0",
		others: "",
	},
	test: {
		NODE_ENV: "test",
		DATABASEURI: "localhost:27017/testTimesheet",
		COOKIE_SECRET: "TESTCOOKIESECRET",
		LOG_LEVEL: "2",
		CONSOLE_LOG_LEVEL: "0",
		others: "",
	},
	production: {
		NODE_ENV: "production",
		DATABASEURI: "localhost:27017/timesheet",
		COOKIE_SECRET: "PRODCOOKIESECRET",
		LOG_LEVEL: "0",
		CONSOLE_LOG_LEVEL: "0",
		others: "PORT=5000",
	},
};

/**
 * Load env vars and run program.
 * @param args env vars
 * @returns void
 */
export const runServer = (args) => {
	// If logging is enabled.
	const log = args[0] === "true";
	if (args[0] === "true" || args[0] === "false") {
		args.splice(0, 1);
	}
	const env = args[0];

	if (args.length > 1) {
		// Apply env vars from config.
		let envVars;
		if (env in config) {
			const info = config[args[0]];

			envVars = `NODE_ENV=${info.NODE_ENV} DATABASEURI=mongodb://${
				info.DATABASEURI
			} COOKIE_SECRET=${info.COOKIE_SECRET}${
				info.others !== "" ? " " + info.others : ""
			}`;
		} else {
			console.warn("No environment variables found, proceeding with start.");
		}

		if (envVars !== undefined) {
			if (log) {
				console.log(`Loaded "${env}" environment`);
				console.log(`Loaded ENV variables: "${envVars}"`);
			}
			args.splice(0, 1);

			const varsArray = envVars.split(" ");

			for (const envVar of varsArray) {
				// Go from string to array of 2.
				const values = envVar.split("=");
				if (values.length != 2) {
					console.error(`${env} was not set properly.`);
					break;
				}
				const index = values[0];
				const value = values[1];
				// Apply env vars to process.
				shell.env[index] = value;
			}
		}
		if (env !== "test") {
			// Run startup before everything.
			const folder = args[1].split("/")[0];
			args.splice(1, 0, folder + "/bin/startUp");
		}
		let runScript = "";
		for (let i = 0; i < args.length; i++) {
			runScript += args[i];
			if (i == args.length - 1) {
				if (log) console.log(`Running "${runScript}"`);
				// Run script.
				return shell.exec(runScript);
			}
			runScript += " ";
		}
	}

	return console.error("Too few arguments were provided to start the server.");
};

runServer(processArgs);
