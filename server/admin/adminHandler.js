"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStaff = exports.getStaff = void 0;
const dataValidator_1 = require("../dataValidation/dataValidator");
const user_1 = require("../model/user");
const getStaff = async () => {
    const staff = await user_1.User.find({ admin: false });
    const sendableStaff = [];
    for (const s of staff) {
        sendableStaff.push(s.sendableUser());
    }
    return sendableStaff;
};
exports.getStaff = getStaff;
const updateStaff = async (staff, changes) => {
    for (const change of changes) {
        if (change.name == "email") {
            if (!dataValidator_1.validateEmail(change.value) || (await dataValidator_1.emailInUse(change.value))) {
                return change.name;
            }
            change.value = change.value.toLowerCase();
        }
        else if (change.name == "name") {
        }
        else if (change.name == "dob") {
            const date = change.value;
            if (date != undefined && date != null) {
                if (!dataValidator_1.validateDate(date)) {
                    return change.name;
                }
            }
        }
        else {
            return change.name;
        }
        staff[change.name] = change.value;
    }
    staff.save();
    return true;
};
exports.updateStaff = updateStaff;
