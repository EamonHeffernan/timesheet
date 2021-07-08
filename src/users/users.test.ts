import "mocha";
import { User, IUser } from "../model/user";
import { expect } from "chai";
import { signIn, signUp, verifySessionKey } from "./userHandler";

require("../model/db");

describe("Create and find user.", () => {
	let backupUser: IUser;

	const name: string = "Jim" + Math.floor(Math.random() * 10).toString();
	const email: string =
		Math.floor(Math.random() * 10).toString() + "jimmy@example.com";
	const password: string =
		"Jim'sGreatPassword123" + Math.floor(Math.random() * 10).toString();

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
		expect(user.sessionKey).to.not.equal("");
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
		expect(user.sessionKey).to.not.equal("");

		const info = await signIn(email, password.toLowerCase());
		expect(info.user).to.equal(undefined);
	});
	it("should authenticate with correct sessionKey", async () => {
		const user = await User.findOne({ email: email });

		expect(verifySessionKey(newSessionKey, user)).to.equal(true);
		expect(verifySessionKey(sessionKey, user)).to.equal(false);
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
