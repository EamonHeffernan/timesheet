import logger, { LogLevel } from "../../logger";
import { initMongoConnection } from "../../model/db";
import { IUser, User } from "../../model/user";
import { hashString } from "../../routes/users/hasher";

const main = async () => {
	await initMongoConnection();
	const admin: IUser = new User();

	//Information sourced from https://www.fakenamegenerator.com/gen-random-au-au.php
	admin.email = "seantregurtha@teleworm.us";
	admin.name = "Sean Tregurtha";
	admin.dob = new Date("1960-08-29Z");
	admin.hash = hashString("ooChieB4Egh");
	admin.admin = true;
	admin.accountCreated = true;
	admin.days = [];
	logger("Added Admin to the database");

	const user1: IUser = new User();
	user1.email = "gabriellecaron@rhyta.com";
	user1.name = "Gabrielle Caron";
	user1.dob = new Date("1947-06-24Z");
	user1.hash = hashString("deiPh0piqu");
	user1.admin = false;
	user1.accountCreated = true;
	user1.days = [];
	logger("Added User1 to the database");

	const user2: IUser = new User();
	user2.email = "georgiatonkin@jourrapide.com";
	user2.name = "Georgia Tonkin";
	user2.dob = new Date("1983-02-22Z");
	user2.hash = hashString("pa0Ei6iejah");
	user2.admin = false;
	user2.accountCreated = true;
	user2.days = [];
	logger("Added User2 to the database");

	const user3: IUser = new User();
	user3.email = "laylapryor@jourrapide.com";
	user3.name = "Layla Pryor";
	user3.dob = new Date("1948-07-02Z");
	user3.hash = hashString("pu1aet0Xei");
	user3.admin = false;
	user3.accountCreated = true;
	user3.days = [];
	logger("Added User2 to the database");

	await Promise.all([admin.save(), user1.save(), user2.save(), user3.save()]);
	logger("Saved database with test information.");
	process.kill(process.pid, "SIGTERM");
};
main();
