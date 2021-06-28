"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_1 = require("../model/user");
const dataValidator_1 = require("./dataValidator");
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
    user.save();
    return { user: user };
};
exports.signUp = signUp;
const signIn = async (email, password) => {
    // Existence and type test done in route, bounds test done here.
    email = email.toLowerCase();
    const user = await user_1.User.findOne({ email: email });
    if (user != null) {
        if (hasher_1.checkHash(password, user.hash)) {
            return { user: user };
        }
    }
    return { error: "Incorrect credentials" };
};
exports.signIn = signIn;
//# sourceMappingURL=userHandler.js.map