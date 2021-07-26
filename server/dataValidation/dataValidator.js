"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToDay = exports.fullDaysSinceDate = exports.stringToDate = exports.validateDate = exports.validateEmail = exports.validatePassword = exports.emailInUse = void 0;
const user_1 = require("../model/user");
const emailInUse = async (email) => {
    return user_1.User.exists({ email: email });
};
exports.emailInUse = emailInUse;
const validatePassword = (password) => {
    return (password.length >= 8 &&
        password.length <= 72 &&
        password.toUpperCase() != password &&
        password.toLowerCase() != password &&
        stringHasNumber(password));
};
exports.validatePassword = validatePassword;
const validateEmail = (email) => {
    // Testing email structure via RegEx sourced from https://stackoverflow.com/a/201378
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
};
exports.validateEmail = validateEmail;
const stringHasNumber = (input) => {
    return /\d/.test(input);
};
// Date Validation
const validateDate = (date, maxYears = 120, minYears = 13) => {
    const difference = date.getTime() - new Date().getTime();
    const newDate = new Date(difference);
    const yearDifference = Math.abs(newDate.getUTCFullYear() - 1970);
    return yearDifference >= minYears && yearDifference <= maxYears;
};
exports.validateDate = validateDate;
const stringToDate = (input) => {
    if (
    //Validating the string's format
    /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/.test(input)) {
        const newDate = new Date(input);
        return newDate;
    }
    return null;
};
exports.stringToDate = stringToDate;
const fullDaysSinceDate = (date) => {
    const dayDuration = 1000 * 60 * 60 * 24;
    const timeNow = exports.dateToDay(new Date());
    const difference = timeNow.getTime() - date.getTime();
    return Math.floor(difference / dayDuration);
};
exports.fullDaysSinceDate = fullDaysSinceDate;
const dateToDay = (date) => {
    date.setUTCHours(0, 0, 0, 0);
    return date;
};
exports.dateToDay = dateToDay;
