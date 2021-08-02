/*
 * @Script: users.test.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-08 12:47:51
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-02 21:33:09
 * @Description: Contains tests for users.
 */

import { expect } from "chai";

import logger from "../../logger";
import { initMongoConnection } from "../../model/db";
import { IUser, User } from "../../model/user";
import { hashString } from "./hasher";
import { AllowedGroups, authenticateUser, signIn, signUp } from "./userHandler";

import "mocha";

describe("Validate User", () => {
	before("connect", initMongoConnection);
	afterEach(function () {
		if (this.currentTest.state === "failed") {
			logger(name);
			logger(email);
			logger(password);
			logger(sessionKey);
		}
	});

	let backupUser: IUser;

	const name: string = "Jim" + Math.floor(Math.random() * 100).toString();
	const email: string =
		Math.floor(Math.random() * 100).toString() + "jimmy@example.com";
	const password: string =
		"Jim'sGreatPassword123" + Math.floor(Math.random() * 100).toString();

	let sessionKey: string;

	it("should create a user with the correct credentials", async () => {
		const userInfo = await signUp(name, email, new Date());
		const user = userInfo.user;
		backupUser = user;

		user.accountCreated = true;
		user.hash = hashString(password);

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
	});
	it("should find user in database", async () => {
		const user = await User.findOne({ email: email });

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
	});
	it("should allow signing in only with the correct credentials", async () => {
		const userInfo = await signIn(email, password);
		const user = userInfo.user;

		sessionKey = userInfo.sessionKey;

		expect(user).to.not.equal(null);
		expect(user.name).to.equal(name);
		expect(user.email).to.equal(email);
		expect(user.hash).to.not.equal(password);
		expect(user.sessionKey.key).to.equal(sessionKey);
	});
	it("should not allow signing in with incorrect credentials", async () => {
		const info = await signIn(email, password.toLowerCase());
		expect(info.user).to.equal(undefined);
	});
	it("should authenticate with correct sessionKey", async () => {
		const user = await User.findOne({ email: email });

		expect(await authenticateUser(sessionKey, AllowedGroups.Both)).to.not.equal(
			false
		);
		expect(await authenticateUser("", AllowedGroups.Both)).to.equal(false);
	});
	it("should delete a user", async () => {
		const user = await User.findOne({ email: email });
		await user.remove();

		const newUser = await User.findOne({ email: email });

		expect(newUser).to.equal(null);
	});

	if (backupUser != null) {
		backupUser.remove();
	}
});
