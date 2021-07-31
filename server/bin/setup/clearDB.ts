import { ChangeRequest } from "../../model/changeRequest";
import { initMongoConnection } from "../../model/db";
import { User } from "../../model/user";

const main = async () => {
	await initMongoConnection();
	await Promise.all([User.deleteMany({}), ChangeRequest.deleteMany({})]);
	console.log("Cleared User Collection");
	console.log("Cleared Change Request Collection");

	process.kill(process.pid, "SIGTERM");
};
main();
