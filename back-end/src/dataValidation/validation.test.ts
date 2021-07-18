import "mocha";

import { expect } from "chai";
import { InputType, validateType, ValidationResult } from "./inputValidator";

describe("Validate date inputs", () => {
	it("should allow a correct date string", () => {
		const dateString = randomDateString();
		const returnedValue: ValidationResult = validateType(
			dateString,
			InputType.Date
		);

		expect(returnedValue.passed).to.equal(true);
		expect(returnedValue.modifiedValue).to.eql(new Date(dateString));
	});
	it("should not allow an incorrect date string", () => {
		// TODO: Increase boundaries tested here.
		const dateString = "2021-01-01T99:99:99Z";
		const returnedValue: ValidationResult = validateType(
			dateString,
			InputType.Date
		);

		expect(returnedValue.passed).to.equal(false);
		expect(returnedValue.modifiedValue).to.equal(undefined);
	});
	it("should set dates to days correctly", () => {
		const dateString = randomDateString();
		const expectedResult = new Date(dateString);
		expectedResult.setUTCHours(0, 0, 0, 0);

		const returnedValue: ValidationResult = validateType(
			dateString,
			InputType.Day
		);

		expect(returnedValue.passed).to.equal(true);
		expect(returnedValue.modifiedValue).to.eql(expectedResult);
	});
});

const randomDateString = (): string => {
	const month = Math.floor(Math.random() * 12);
	// 28 to ensure no issues with months that have less days.
	const day = Math.floor(Math.random() * 28);
	const hour = Math.floor(Math.random() * 24);
	const minute = Math.floor(Math.random() * 60);
	const second = Math.floor(Math.random() * 60);
	return (
		"2021-" +
		String(month).padStart(2, "0") +
		"-" +
		String(day).padStart(2, "0") +
		"T" +
		String(hour).padStart(2, "0") +
		":" +
		String(minute).padStart(2, "0") +
		":" +
		String(second).padStart(2, "0") +
		"Z"
	);
};
