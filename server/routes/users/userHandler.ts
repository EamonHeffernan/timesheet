/*
 * @Script: userHandler.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-16 12:44:51
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 15:32:53
 * @Description: Receives and handles everything relating to users.
 */

import srs from "secure-random-string";

import { prod, test } from "../../app";
import validateData, { emailInUse } from "../../dataValidation/validateData";
import { sendPasswordReset } from "../../emailer/emailer";
import { IUser, User } from "../../model/user";
import { checkHash, hashString } from "./hasher";

// Testing value
// By adding check for dev mode, removes chances of leaving this off in prod.
const removeAdminAuthentication = false && !prod && !test;

export enum AllowedGroups {
	Staff,
	Admin,
	Both,
}

export interface IUserHandlerResponse {
	user?: IUser;
	sessionKey?: string;
	error?: string;
}

/**
 * Creates a new user and saves it to the db.
 * @param name User's name
 * @param email User's email
 * @param dob User's date of birth
 * @returns IUserHandlerResponse based on success.
 */
export const signUp = async (
	name: string,
	email: string,
	dob: Date
): Promise<IUserHandlerResponse> => {
	// email in lowercase to ensure consistency.
	email = email.toLowerCase();

	// Ensure email is not in use.
	if (await emailInUse(email)) return { error: "Email in use" };

	// Assign values to new User.
	const user = new User();
	user.name = name;
	user.email = email;
	user.dob = dob;
	user.admin = false;

	// Generate password code and email it to the user.
	generatePasswordReset(user);

	user.save();

	return { user: user };
};

export const signIn = async (
	email: string,
	password: string
): Promise<IUserHandlerResponse> => {
	const user = await User.findOne({ email: email });
	if (user != null) {
		if (checkHash(password, user.hash)) {
			const sessionKey = createToken(user, "sessionKey");
			user.save();
			return { user: user, sessionKey: sessionKey };
		}
	}

	return { error: "Incorrect credentials" };
};

const createToken = (
	user: IUser,
	location: "sessionKey" | "passwordResetToken"
): string => {
	// Create user key.
	const key = srs({ length: 72 });

	// Store key in database.
	user[location] = { key, timeStamp: new Date() };

	// Return plaintext key to be sent to the user.
	return key;
};

/**
 * Find and authenticate a user based on key
 * and if the user is part of the given group.
 * @param sessionKey User's key to search for.
 * @param allowedGroups Allow user through if they are part of this group.
 * @returns The User object or false.
 */
export const authenticateUser = async (
	sessionKey: string,
	allowedGroups: AllowedGroups
) => {
	if (!validateData({ value: sessionKey, level: "Format", format: "Id" })) {
		return false;
	}
	// Find user with given session key
	const user: IUser = await User.findOne({
		"sessionKey.key": sessionKey,
	});

	// If not found return false
	if (user == null) {
		return false;
	}

	// If key is older than one week return false
	if (new Date().getTime() - user.sessionKey.timeStamp.getTime() > 604800000) {
		return false;
	}

	// If admin authentication is removed and the admin role
	// is allowed, return user.
	if (
		removeAdminAuthentication &&
		(allowedGroups === AllowedGroups.Admin ||
			allowedGroups === AllowedGroups.Both)
	) {
		return user;
	}

	// Create booleans for whether each roles is allowed.
	const admin =
		allowedGroups === AllowedGroups.Admin ||
		allowedGroups === AllowedGroups.Both;
	const staff =
		allowedGroups === AllowedGroups.Staff ||
		allowedGroups === AllowedGroups.Both;

	// Check booleans against user.admin and return
	// accordingly.
	if (
		((user.admin && admin) || (!user.admin && staff)) &&
		sessionKey == user.sessionKey.key
	) {
		return user;
	} else {
		return false;
	}
};

/**
 * Create a request for a password reset.
 * @param email Email to search for.
 * @returns true or false if email has been found.
 */
export const forgotPassword = async (email: string) => {
	// Find user based on email.
	const user = await User.findOne({ email });
	// If email not found return false.
	if (user === null) return false;

	// Remove current session key and generate a password reset.
	user.sessionKey = undefined;
	generatePasswordReset(user);

	// Save and return true.
	user.save();
	return true;
};

/**
 * Create a new password reset token and email
 * it to the given user.
 * @param user User to reset password.
 */
const generatePasswordReset = (user: IUser) => {
	const key = createToken(user, "passwordResetToken");

	sendPasswordReset(user.email, user.name, key, !user.accountCreated);
};

/**
 * Reset the password from a generated token.
 * @param key The generated key.
 * @param password The new password
 * @returns true or false if key was valid.
 */
export const resetPassword = async (key: string, password: string) => {
	// Find key on user.
	const user = await User.findOne({ "passwordResetToken.key": key });
	if (user === null) return false;

	// If account has not already been created there is no
	// time constraint.
	if (user.accountCreated) {
		// Ensure key was created in the last 15 minutes
		if (
			new Date().getTime() - user.passwordResetToken.timeStamp.getTime() >
			900000
		) {
			return false;
		}
	}

	// Set new password hash.
	user.hash = hashString(password);

	// Set accountCreated and remove the old token.
	user.accountCreated = true;
	user.passwordResetToken = undefined;
	user.save();
	return true;
};

/**
 * Remove session key from user to prevent
 * session key usage.
 * @param user User to sign out.
 */
export const signOut = (user: IUser) => {
	user.sessionKey = undefined;
	user.save();
};
