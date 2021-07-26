"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const inputValidator_1 = require("./inputValidator");
describe("Validate date inputs", () => {
    it("should allow a correct date string", () => {
        const dateString = randomDateString();
        const returnedValue = inputValidator_1.validateType(dateString, inputValidator_1.InputType.Date);
        console.log(dateString);
        chai_1.expect(returnedValue.passed).to.equal(true);
        chai_1.expect(returnedValue.modifiedValue).to.eql(new Date(dateString));
    });
    it("should not allow an incorrect date string", () => {
        // TODO: Increase boundaries tested here.
        const dateString = "2021-01-01T99:99:99Z";
        const returnedValue = inputValidator_1.validateType(dateString, inputValidator_1.InputType.Date);
        chai_1.expect(returnedValue.passed).to.equal(false);
        chai_1.expect(returnedValue.modifiedValue).to.equal(undefined);
    });
    it("should set dates to days correctly", () => {
        const dateString = randomDateString();
        const expectedResult = new Date(dateString);
        expectedResult.setUTCHours(0, 0, 0, 0);
        const returnedValue = inputValidator_1.validateType(dateString, inputValidator_1.InputType.Day);
        chai_1.expect(returnedValue.passed).to.equal(true);
        chai_1.expect(returnedValue.modifiedValue).to.eql(expectedResult);
    });
});
const randomDateString = () => {
    const month = Math.floor(Math.random() * 12) + 1; // 1 - 12
    // 28 to ensure no issues with months that have less days.
    const day = Math.floor(Math.random() * 28) + 1; // 1 - 28
    const hour = Math.floor(Math.random() * 24); // 0 - 23
    const minute = Math.floor(Math.random() * 60); // 0 - 59
    const second = Math.floor(Math.random() * 60); // 0 - 59
    return ("2021-" +
        String(month).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0") +
        "T" +
        String(hour).padStart(2, "0") +
        ":" +
        String(minute).padStart(2, "0") +
        ":" +
        String(second).padStart(2, "0") +
        "Z");
};
