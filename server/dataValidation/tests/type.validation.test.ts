/*
 * @Script: type.validation.test.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-12 14:29:57
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 22:30:37
 * @Description: Tests for data validation.
 */

import { expect } from "chai";

import "mocha";
import { existenceCheck, ValidationResult, typeCheck } from "../validateData";

interface ValidationTest {
	inputValue: any;
	expectedValue?: any;
	expectedPass: boolean;
}

const undefinedArray = [
	{ inputValue: null, expectedPass: false },
	{ inputValue: undefined, expectedPass: false },
];

describe("Existence Check", () => {
	it("should validate set values", () => {
		CheckValidation(
			[
				{ inputValue: "Words", expectedPass: true },
				{ inputValue: true, expectedPass: true },
				{ inputValue: 123, expectedPass: true },
				{
					inputValue: { 1: 1, 2: 2, 3: 3 },
					expectedPass: true,
				},
				{
					inputValue: [1, 2, 3],
					expectedPass: true,
				},
			],
			existenceCheck
		);
	});
	it("should not validate unset values", () => {
		const someObject = {};
		CheckValidation(
			[
				{ inputValue: null, expectedPass: false },
				{ inputValue: undefined, expectedPass: false },
				{ inputValue: someObject["someKey"], expectedPass: false },
			],
			existenceCheck
		);
	});
	it("allow null values when specified", () => {
		CheckValidation(
			[
				{ inputValue: null, expectedPass: true },
				{ inputValue: undefined, expectedPass: false },
			],
			existenceCheck,
			true
		);
	});
});

describe("Type Check - String", () => {
	it("should validate strings", () => {
		CheckValidation(
			[
				{ inputValue: "Words", expectedPass: true },
				{ inputValue: "Birds", expectedPass: true },
				{
					inputValue: "Other test strings",
					expectedPass: true,
				},
				{ inputValue: "", expectedPass: true },
				{
					inputValue: "abcdefghijlmnop",
					expectedPass: true,
				},
			],
			typeCheck,
			"string"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: 1,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: true,
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"string"
		);
	});
});

describe("Type Check - Bool", () => {
	it("should validate bool", () => {
		CheckValidation(
			[
				{ inputValue: true, expectedPass: true },
				{ inputValue: false, expectedPass: true },
				{
					inputValue: 1 === 1,
					expectedValue: true,
					expectedPass: true,
				},
			],
			typeCheck,
			"boolean"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: 1,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: "",
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"boolean"
		);
	});
});

describe("Type Check - Number", () => {
	it("should validate numbers", () => {
		CheckValidation(
			[
				{ inputValue: 0, expectedPass: true },
				{ inputValue: -10000, expectedPass: true },
				{
					inputValue: 50233242432,
					expectedPass: true,
				},
				{
					inputValue: parseInt("6"),
					expectedValue: 6,
					expectedPass: true,
				},
				{ inputValue: 5, expectedValue: 5, expectedPass: true },
			],
			typeCheck,
			"number"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: false,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: "",
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"number"
		);
	});
});

describe("Type Check - Date", () => {
	it("should validate dates", () => {
		CheckValidation(
			[
				{
					inputValue: new Date(1000000),
					expectedPass: true,
				},
				{
					inputValue: new Date(0),
					expectedPass: true,
				},
				{
					inputValue: new Date(-1000000),
					expectedPass: true,
				},
				{
					inputValue: "2021-08-01T00:00:00Z",
					expectedValue: new Date("2021-08-01T00:00:00Z"),
					expectedPass: true,
				},
			],
			typeCheck,
			"date"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: false,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: "",
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"date"
		);
	});
});

describe("Type Check - Day", () => {
	it("should validate days", () => {
		CheckValidation(
			[
				{
					inputValue: {
						start: "2021-08-01T00:00:00Z",
						end: "2021-08-01T01:00:00Z",
					},
					expectedPass: true,
				},
				{
					inputValue: {
						start: "2021-08-02T00:00:00Z",
						end: "2021-08-01T01:00:00Z",
					},
					expectedPass: true,
				},
				{
					inputValue: {
						start: "2021-08-01T00:00:00Z",
						end: "2021-08-01T01:00:00Z",
						breaks: [],
					},
					expectedPass: true,
				},
				{
					inputValue: {
						start: "2021-08-01T00:00:00Z",
						end: "2021-08-01T01:00:00Z",
						breaks: [
							{
								start: "2021-08-01T00:30:00Z",
								end: "2021-08-01T00:45:00Z",
							},
							{
								start: "2021-08-01T00:45:00Z",
								end: "2021-08-01T00:50:00Z",
							},
						],
					},
					expectedPass: true,
				},
			],
			typeCheck,
			"day"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: false,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: "",
						expectedPass: false,
					},
					{
						inputValue: {
							start: 1,
							end: 2,
						},
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"day"
		);
	});
});

describe("Type Check - Break", () => {
	it("should validate breaks", () => {
		CheckValidation(
			[
				{
					inputValue: {
						start: "2021-08-01T00:45:00Z",
						end: "2021-08-01T00:50:00Z",
					},
					expectedPass: true,
				},
				{
					inputValue: {
						start: "2021-08-01T00:45:00Z",
						end: "2021-08-01T04:50:00Z",
					},
					expectedPass: true,
				},
				{
					inputValue: {
						start: "2021-07-31T00:45:00Z",
						end: "2021-08-01T04:50:00Z",
					},
					expectedPass: true,
				},
			],
			typeCheck,
			"break"
		);
	});
	it("should not validate other types", () => {
		CheckValidation(
			[
				...undefinedArray,
				...[
					{
						inputValue: false,
						expectedPass: false,
					},
					{
						inputValue: { 1: 1 },
						expectedPass: false,
					},
					{
						inputValue: [1, 2, 3],
						expectedPass: false,
					},
					{
						inputValue: "",
						expectedPass: false,
					},
					{
						inputValue: {
							start: 1,
							end: 2,
						},
						expectedPass: false,
					},
				],
			],
			typeCheck,
			"break"
		);
	});
});

const CheckValidation = (
	infoArray: ValidationTest[],
	test: (value: any, ...params: any[]) => ValidationResult,
	param: any = undefined
) => {
	for (const info of infoArray) {
		const result = test(info.inputValue, param);
		expect(result.passed).to.equal(info.expectedPass);
		if (result.passed) {
			const checkObject =
				info.expectedValue === undefined ? info.inputValue : info.expectedValue;
			if (typeof checkObject === "object") {
				expect(result.value).to.eql(checkObject);
			} else {
				expect(result.value).to.equal(checkObject);
			}
		}
	}
};
