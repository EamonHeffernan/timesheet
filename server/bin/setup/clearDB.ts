/*
 * @Script: clearDB.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 09:11:31
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:12:18
 * @Description: Clears the database.
 */

import logger, { LogLevel } from "../../logger";
import { ChangeRequest } from "../../model/changeRequest";
import { initMongoConnection } from "../../model/db";
import { User } from "../../model/user";

const main = async () => {
	await initMongoConnection();
	await Promise.all([User.deleteMany({}), ChangeRequest.deleteMany({})]);
	logger("Cleared User Collection");
	logger("Cleared Change Request Collection");

	process.kill(process.pid, "SIGTERM");
};
main();
