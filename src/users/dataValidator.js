"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = exports.validatePassword = exports.emailInUse = void 0;
const user_1 = require("../model/user");
const emailInUse = async (email) => {
    return user_1.User.exists({ email: email });
};
exports.emailInUse = emailInUse;
const validatePassword = (password) => {
    return (password.length > 6 &&
        password.length < 64 &&
        password.toUpperCase() != password &&
        password.toLowerCase() != password &&
        hasNumber(password));
};
exports.validatePassword = validatePassword;
const validateDate = (date, maxYears = 120, minYears = 13) => {
    const difference = date.getTime() - new Date().getTime();
    const newDate = new Date(difference);
    const yearDifference = Math.abs(newDate.getUTCFullYear() - 1970);
    return yearDifference >= minYears && yearDifference <= maxYears;
};
exports.validateDate = validateDate;
const hasNumber = (input) => {
    return /\d/.test(input);
};
//# sourceMappingURL=dataValidator.js.map