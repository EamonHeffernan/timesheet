#! /usr/bin/env node
import shell from "shelljs";

const [, , ...processArgs] = process.argv;

const config = {
	development: {
		NODE_ENV: "development",
		DATABASEURI: "localhost:27017/timesheet",
		COOKIE_SECRET: "DEVELOPMENTCOOKIESECRET",
		others: "",
	},
	test: {
		NODE_ENV: "test",
		DATABASEURI: "localhost:27017/testTimesheet",
		COOKIE_SECRET: "TESTCOOKIESECRET",
		others: "",
	},
	production: {
		NODE_ENV: "production",
		DATABASEURI: "localhost:27017/timesheet",
		COOKIE_SECRET: "PRODCOOKIESECRET",
		others: "PORT=5000",
	},
};

export const runServer = (args) => {
	const log = args[0] === "true";
	if (args[0] === "true" || args[0] === "false") {
		args.splice(0, 1);
	}

	if (args.length > 1) {
		let envVars;
		if (args[0] in config) {
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
				console.log(`Loaded "${args[0]}" environment`);
				console.log(`Loaded ENV variables: "${envVars}"`);
			}
			args.splice(0, 1);

			const varsArray = envVars.split(" ");

			for (const envVar of varsArray) {
				const values = envVar.split("=");
				if (values.length != 2) {
					console.error(`${values[0]} was not set properly.`);
					break;
				}
				const index = values[0];
				const value = values[1];

				shell.env[index] = value;
			}
		}

		let runScript = "";
		for (let i = 0; i < args.length; i++) {
			runScript += args[i];
			if (i == args.length - 1) {
				if (log) console.log(`Running "${runScript}"`);
				return shell.exec(runScript);
			}
			runScript += " ";
		}
	}

	return console.error("Too few arguments were provided to start the server.");
};

runServer(processArgs);
