#! /usr/bin/env node
import shell from "shelljs";

const [, , ...processArgs] = process.argv;

export const runServer = (args) => {
	const log = args[0] === "true";
	if (args[0] === "true" || args[0] === "false") {
		args.splice(0, 1);
	}

	if (args.length > 1) {
		let envVars;
		switch (args[0]) {
			case "development":
				envVars =
					"NODE_ENV=development DATABASEURI=mongodb://127.0.0.1:27017/timesheet COOKIE_SECRET=DEVELOPMENTCOOKIESECRET";
				break;
			case "test":
				envVars =
					"NODE_ENV=development DATABASEURI=mongodb://127.0.0.1:27017/testTimesheet COOKIE_SECRET=TESTCOOKIESECRET";
				break;
			case "production":
				envVars =
					"NODE_ENV=production DATABASEURI=mongodb://127.0.0.1:27017/testTimesheet COOKIE_SECRET=PRODCOOKIESECRET";
				break;
			default:
				if (log)
					console.log("No environment variables found, proceeding with start.");
				break;
		}
		if (envVars != undefined) {
			if (log) {
				console.log(`Loaded "${args[0]}" environment`);
				console.log(`Loaded ENV variables: ${envVars}`);
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
