"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const user_1 = require("../model/user");
const chai_1 = require("chai");
const userHandler_1 = require("./userHandler");
const db_1 = require("../model/db");
require("../model/db");
describe("Create, find and authenticate user.", () => {
    before("connect", db_1.initMongoConnection);
    let backupUser;
    const name = "Jim" + Math.floor(Math.random() * 100).toString();
    const email = Math.floor(Math.random() * 100).toString() + "jimmy@example.com";
    const password = "Jim'sGreatPassword123" + Math.floor(Math.random() * 100).toString();
    let sessionKey;
    let newSessionKey;
    it("should create a user with the correct credentials", async () => {
        const userInfo = await userHandler_1.signUp(name, email, new Date(), password);
        const user = userInfo.user;
        backupUser = user;
        sessionKey = userInfo.sessionKey;
        chai_1.expect(user).to.not.equal(null);
        chai_1.expect(user.name).to.equal(name);
        chai_1.expect(user.email).to.equal(email);
        chai_1.expect(user.hash).to.not.equal(password);
        chai_1.expect(user.sessionKey).to.not.equal(sessionKey);
    });
    it("should find user in database", async () => {
        const user = await user_1.User.findOne({ email: email });
        chai_1.expect(user).to.not.equal(null);
        chai_1.expect(user.name).to.equal(name);
        chai_1.expect(user.email).to.equal(email);
        chai_1.expect(user.hash).to.not.equal(password);
        chai_1.expect(user.sessionKey).to.not.equal("");
    });
    it("should allow signing in with the correct credentials", async () => {
        const userInfo = await userHandler_1.signIn(email, password);
        const user = userInfo.user;
        newSessionKey = userInfo.sessionKey;
        chai_1.expect(user).to.not.equal(null);
        chai_1.expect(user.name).to.equal(name);
        chai_1.expect(user.email).to.equal(email);
        chai_1.expect(user.hash).to.not.equal(password);
        chai_1.expect(user.sessionKey).to.not.equal(newSessionKey);
        chai_1.expect(newSessionKey).to.not.equal(sessionKey);
        const info = await userHandler_1.signIn(email, password.toLowerCase());
        chai_1.expect(info.user).to.equal(undefined);
    });
    it("should authenticate with correct sessionKey", async () => {
        const user = await user_1.User.findOne({ email: email });
        chai_1.expect(userHandler_1.authenticateUser(user, newSessionKey, userHandler_1.AllowedGroups.Both)).to.equal(true);
        chai_1.expect(userHandler_1.authenticateUser(user, sessionKey, userHandler_1.AllowedGroups.Both)).to.not.equal(true);
    });
    it("should delete a user", async () => {
        const user = await user_1.User.findOne({ email: email });
        user.remove();
        const newUser = await user_1.User.findOne({ email: email });
        chai_1.expect(newUser).to.equal(null);
    });
    if (backupUser != null) {
        backupUser.remove();
    }
});
