"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDays = exports.addDay = void 0;
const dataValidator_1 = require("../dataValidation/dataValidator");
const changeRequest_1 = require("../model/changeRequest");
const user_1 = require("../model/user");
const addDay = (user, start, end, breaks) => {
    // TODO: Update old day if day is in array, while maintaining order.
    let duration = (end.getTime() - start.getTime()) / 1000;
    if (duration > 0) {
        for (let i = 0; i < breaks.length; i++) {
            const breakDuration = (breaks[i].end.getTime() - breaks[i].start.getTime()) / 1000;
            if (breakDuration <= 0) {
                duration -= breakDuration;
                return false;
            }
        }
        const day = new user_1.Day();
        day.start = start;
        day.end = end;
        day.breaks = breaks;
        day.duration = duration;
        if (user.days == undefined) {
            user.days = [day];
        }
        else {
            const index = user.days.findIndex((d) => d.start.getTime() == day.start.getTime());
            if (index != -1) {
                const changeRequest = new changeRequest_1.ChangeRequest();
                changeRequest.staffId = user.id;
                changeRequest.newDay = user.days[index];
                changeRequest.save();
            }
            else {
                user.days.push(day);
            }
        }
        user.save();
        return true;
    }
    return false;
};
exports.addDay = addDay;
const getDays = (user, duration) => {
    const days = user.days;
    let validDays = 0;
    for (var i = days.length - 1; i >= 0; i--) {
        const day = days[i];
        if (dataValidator_1.fullDaysSinceDate(day.start) < duration) {
            validDays++;
        }
        else {
            break;
        }
    }
    if (validDays > 0)
        return days.slice(-validDays);
    return [];
};
exports.getDays = getDays;
