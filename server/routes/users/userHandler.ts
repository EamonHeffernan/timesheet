import srs from "secure-random-string";

import { prod, test } from "../../app";
import validateData, { emailInUse } from "../../dataValidation/validateData";
import { IUser, User } from "../../model/user";
import { checkHash, hashString } from "./hasher";

// By adding check for dev mode, removes chances of leaving this off in prod.
const removeAdminAuthentication = true && !prod && !test;

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
export const signUp = async (
	name: string,
	email: string,
	dob: Date,
	password: string
): Promise<IUserHandlerResponse> => {
	// Existence and type test done in route, bounds test done here.
	email = email.toLowerCase();

	if (await emailInUse(email)) return { error: "Email in use" };

	const user = new User();
	user.name = name;
	user.email = email;
	user.dob = dob;
	user.hash = hashString(password);
	user.admin = false;

	// has to be called before save otherwise the session key is not saved.
	const sessionKey = createSessionKey(user);

	user.save();

	return { user: user, sessionKey: sessionKey };
};

export const signIn = async (
	email: string,
	password: string
): Promise<IUserHandlerResponse> => {
	const user = await User.findOne({ email: email });
	if (user != null) {
		if (checkHash(password, user.hash)) {
			const sessionKey = createSessionKey(user);
			user.save();
			return { user: user, sessionKey: sessionKey };
		}
	}

	return { error: "Incorrect credentials" };
};

const createSessionKey = (user: IUser): string => {
	// Create user key.
	const key = srs({ length: 72 });

	// Store key in database.
	user.sessionKey = { key, timeStamp: new Date() };

	// Return plaintext key to be sent to the user.
	return key;
};

export const authenticateUser = async (
	sessionKey: string,
	allowedGroups: AllowedGroups
) => {
	if (!validateData({ value: sessionKey, level: "Format", format: "Id" })) {
		return false;
	}
	const user: IUser = await User.findOne({
		"sessionKey.key": sessionKey,
	});
	if (user == null) {
		return false;
	}
	if (
		removeAdminAuthentication &&
		(allowedGroups === AllowedGroups.Admin ||
			allowedGroups === AllowedGroups.Both)
	) {
		return user;
	}

	const admin =
		allowedGroups === AllowedGroups.Admin ||
		allowedGroups === AllowedGroups.Both;
	const staff =
		allowedGroups === AllowedGroups.Staff ||
		allowedGroups === AllowedGroups.Both;

	if (
		((user.admin && admin) || (!user.admin && staff)) &&
		sessionKey == user.sessionKey.key
	) {
		return user;
	} else {
		return false;
	}
};

export const signOut = (user: IUser) => {
	user.sessionKey = undefined;
	user.save();
};
