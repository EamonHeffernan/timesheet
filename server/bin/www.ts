import app, { nextApp, setup } from "../app";
import logger, { LogLevel } from "../logger";
import { initMongoConnection } from "../model/db";

const initApp = async () => {
	setup();
	await Promise.all([initMongoConnection(), nextApp.prepare()]);

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => logger(`Server started on ${PORT}`));
};

initApp();
