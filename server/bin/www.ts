/*
 * @Script: www.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-12 14:29:04
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:12:43
 * @Description: Base of project. Calls all other scripts.
 */

import app, { nextApp, setup } from "../app";
import logger, { LogLevel } from "../logger";
import { initMongoConnection } from "../model/db";

const initApp = async () => {
	// Setup app.
	setup();

	// Wait for both the next app and mongo to be ready.
	await Promise.all([initMongoConnection(), nextApp.prepare()]);

	const PORT = process.env.PORT || 3000;

	// Start server.
	app.listen(PORT, () => logger(`Server started on ${PORT}`));
};

// Whole application is called here.
initApp();
