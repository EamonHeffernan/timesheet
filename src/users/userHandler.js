"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const user_1 = require("../model/user");
const dataValidator_1 = require("./dataValidator");
const hasher_1 = require("./hasher");
const signUp = async (name, email, dob, password) => {
    // Existence and type test done in route, bounds test done here.
    email = email.toLowerCase();
    if (dataValidator_1.emailInUse(email))
        return { error: "Email in use" };
    if (!dataValidator_1.validatePassword(password))
        return { error: "Password does not meet requirements" };
    const user = new user_1.User();
    user.name = name;
    user.email = email;
    user.dob = dob;
    user.hash = hasher_1.hashString(password);
    return { user: user };
};
exports.signUp = signUp;
//# sourceMappingURL=userHandler.js.map