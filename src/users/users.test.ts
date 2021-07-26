import "mocha";
import { User, IUser } from "../model/user";
import { expect } from "chai";
import { AllowedGroups, authenticateUser, signIn, signUp } from "./userHandler";
import { initMongoConnection } from "../model/db";

require("../model/db");

describe("Create, find and authenticate user.", () => {
	before("connect", initMongoConnection);

	let backupUser: IUser;

	const name: string = "Jim" + Math.floor(Math.random() * 100).toString();
	const email: string =
		Math.floor(Math.random() * 100).toString() + "jimmy@example.com";
	const password: string =
		"Jim'sGreatPassword123" + Math.floor(Math.random() * 100).toString();

	let sessionKey: string;
	let newSessionKey: string;

	it("should create a user with the correct credentials", async () => {
		const userInfo = await signUp(name, email, new Date(), password);
		const user = userInfo.user;
		backupUser = user;

		sessionKey = userInfo.sessionKey;

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
		expect(user.sessionKey).to.not.equal(sessionKey);
	});
	it("should find user in database", async () => {
		const user = await User.findOne({ email: email });

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
		expect(user.sessionKey).to.not.equal("");
	});
	it("should allow signing in with the correct credentials", async () => {
		const userInfo = await signIn(email, password);
		const user = userInfo.user;

		newSessionKey = userInfo.sessionKey;

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
		expect(user.sessionKey).to.not.equal(newSessionKey);
		expect(newSessionKey).to.not.equal(sessionKey);

		const info = await signIn(email, password.toLowerCase());
		expect(info.user).to.equal(undefined);
	});
	it("should authenticate with correct sessionKey", async () => {
		const user = await User.findOne({ email: email });

		expect(authenticateUser(user, newSessionKey, AllowedGroups.Both)).to.equal(
			true
		);
		expect(authenticateUser(user, sessionKey, AllowedGroups.Both)).to.not.equal(
			true
		);
	});
	it("should delete a user", async () => {
		const user = await User.findOne({ email: email });
		user.remove();

		const newUser = await User.findOne({ email: email });

		expect(newUser).to.equal(null);
	});

	if (backupUser != null) {
		backupUser.remove();
	}
});
