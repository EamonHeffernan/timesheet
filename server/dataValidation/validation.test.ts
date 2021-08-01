/*
 * @Script: validation.test.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-12 14:29:57
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:04:36
 * @Description: Tests for data validation.
 */

import { expect } from "chai";

import { DataType, reasonabilityCheck, typeCheck } from "./validateData";

import "mocha";

describe("Validate Dates", () => {
	it("should allow a correct date string", () => {
		const dateString = randomDateString();

		const result = typeCheck(dateString, DataType.Date);

		expect(result.passed).to.equal(true);
		expect(result.value).to.eql(new Date(dateString));
	});
	it("should not allow an incorrect date string", () => {
		const dateString = "Not a date";

		const result = typeCheck(dateString, DataType.Date);

		expect(result.passed).to.equal(false);
	});
});

describe("Validate Days", () => {
	it("should validate a correct day", () => {
		const result = reasonabilityCheck(
			{ start: new Date(new Date().getTime() - 1), end: new Date() },
			"Break"
		);

		expect(result.passed).to.equal(true);
	});
});

const randomDateString = (): string => {
	const month = Math.floor(Math.random() * 12) + 1; // 1 - 12
	// 28 to ensure no issues with months that have less days.
	const day = Math.floor(Math.random() * 28) + 1; // 1 - 28
	const hour = Math.floor(Math.random() * 24); // 0 - 23
	const minute = Math.floor(Math.random() * 60); // 0 - 59
	const second = Math.floor(Math.random() * 60); // 0 - 59

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
