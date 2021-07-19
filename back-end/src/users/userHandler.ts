import srs from "secure-random-string";

import { User, IUser } from "../model/user";
import {
	emailInUse,
	validateEmail,
	validatePassword,
} from "../dataValidation/dataValidator";
import { hashString, checkHash } from "./hasher";

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

	if (!validateEmail(email)) return { error: "Email not valid" };

	if (await emailInUse(email)) return { error: "Email in use" };

	if (!validatePassword(password))
		return { error: "Password does not meet requirements" };

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
	// Existence and type test done in route, bounds test done here.
	email = email.toLowerCase();

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

	// Hash the key for storage in the database.
	const hashedKey = hashString(key);

	// Store key in database.
	user.sessionKey = hashedKey;

	// Return plaintext key to be sent to the user.
	return key;
};

export const authenticateUser = (
	user: IUser,
	sessionKey: string,
	staff: boolean,
	admin: boolean
) => {
	return (
		((user.admin && admin) || (!user.admin && staff)) &&
		checkHash(sessionKey, user.sessionKey)
	);
};
