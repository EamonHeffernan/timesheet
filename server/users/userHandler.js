"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.AllowedGroups = exports.authenticateUser = exports.signIn = exports.signUp = void 0;
const secure_random_string_1 = __importDefault(require("secure-random-string"));
const user_1 = require("../model/user");
const dataValidator_1 = require("../dataValidation/dataValidator");
const hasher_1 = require("./hasher");
const signUp = async (name, email, dob, password) => {
    // Existence and type test done in route, bounds test done here.
    email = email.toLowerCase();
    if (!dataValidator_1.validateEmail(email))
        return { error: "Email not valid" };
    if (await dataValidator_1.emailInUse(email))
        return { error: "Email in use" };
    if (!dataValidator_1.validatePassword(password))
        return { error: "Password does not meet requirements" };
    const user = new user_1.User();
    user.name = name;
    user.email = email;
    user.dob = dob;
    user.hash = hasher_1.hashString(password);
    user.admin = false;
    // has to be called before save otherwise the session key is not saved.
    const sessionKey = createSessionKey(user);
    user.save();
    return { user: user, sessionKey: sessionKey };
};
exports.signUp = signUp;
const signIn = async (email, password) => {
    // Existence and type test done in route, bounds test done here.
    email = email.toLowerCase();
    const user = await user_1.User.findOne({ email: email });
    if (user != null) {
        if (hasher_1.checkHash(password, user.hash)) {
            const sessionKey = createSessionKey(user);
            user.save();
            return { user: user, sessionKey: sessionKey };
        }
    }
    return { error: "Incorrect credentials" };
};
exports.signIn = signIn;
const createSessionKey = (user) => {
    // Create user key.
    const key = secure_random_string_1.default({ length: 72 });
    // Store key in database.
    user.sessionKey = key;
    // Return plaintext key to be sent to the user.
    return key;
};
const authenticateUser = (user, sessionKey, allowedGroups) => {
    const admin = allowedGroups === AllowedGroups.Admin ||
        allowedGroups === AllowedGroups.Both;
    const staff = allowedGroups === AllowedGroups.Staff ||
        allowedGroups === AllowedGroups.Both;
    return (((user.admin && admin) || (!user.admin && staff)) &&
        sessionKey == user.sessionKey);
};
exports.authenticateUser = authenticateUser;
var AllowedGroups;
(function (AllowedGroups) {
    AllowedGroups[AllowedGroups["Staff"] = 0] = "Staff";
    AllowedGroups[AllowedGroups["Admin"] = 1] = "Admin";
    AllowedGroups[AllowedGroups["Both"] = 2] = "Both";
})(AllowedGroups = exports.AllowedGroups || (exports.AllowedGroups = {}));
const signOut = (user) => {
    user.sessionKey = undefined;
    user.save();
};
exports.signOut = signOut;
