/*
 * @Script: hasher.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-16 12:44:12
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 13:53:52
 * @Description: Hashes and checks hashes for passwords.
 */

import bcrypt from "bcrypt";

/**
 * Check if hash was created from string
 * @param plainText Plaintext input
 * @param hash Hashed version to compare against
 * @returns Boolean if the hash was created from the plaintext string
 */
export const checkHash = (plainText: string, hash: string): boolean => {
	return bcrypt.compareSync(plainText, hash);
};

/**
 * Hash a string
 * @param input Plaintext input
 * @returns Hashed version of string with 10 salt rounds
 */
export const hashString = (input: string) => {
	return bcrypt.hashSync(input, 10);
};
