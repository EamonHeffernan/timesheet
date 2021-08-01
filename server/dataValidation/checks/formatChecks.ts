/*
 * @Script: formatChecks.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-29 17:56:49
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:11:02
 * @Description: Contains specific format checks.
 */

import { validationResult, ValidationResult } from "../validateData";

/**
 * Check if value is formatted as a password
 * @param value Value to check format
 * @returns Validation Result
 */
export const validPassword = (value: string): ValidationResult => {
	return validationResult(
		value.length >= 8 &&
			value.length <= 72 &&
			value.toUpperCase() != value &&
			value.toLowerCase() != value &&
			stringHasNumber(value),
		value
	);
};

/**
 * Check if value is formatted as a email
 * @param value Value to check format
 * @returns Validation Result
 */
export const validEmail = (value: string): ValidationResult => {
	// Testing email structure via RegEx sourced from https://stackoverflow.com/a/201378
	value = value.toLowerCase();
	return validationResult(
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
			value
		),
		value
	);
};

/**
 * Check if value is formatted as a name
 * @param value Value to check format
 * @returns Validation Result
 */
export const validName = (value: string): ValidationResult => {
	return validationResult(
		value === value.trim() && value.length < 24 && !stringHasNumber(value),
		value
	);
};

/**
 * Check if value is formatted as a id
 * @param value Value to check format
 * @returns Validation Result
 */
export const validId = (value: string): ValidationResult => {
	// Testing email structure via RegEx sourced from https://stackoverflow.com/a/201378
	return validationResult(value.length >= 12, value);
};

/**
 * Does string have number.
 * @param input String to check has number
 * @returns Whether the string has a number.
 */
const stringHasNumber = (input: string): boolean => {
	return /\d/.test(input);
};
