import { User, IUser } from "../model/user";
import { emailInUse, validateEmail, validatePassword } from "./dataValidator";
import { hashString } from "./hasher";

export interface IUserHandlerResponse {
	user?: IUser;
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
	if (emailInUse(email)) return { error: "Email in use" };
	if (!validatePassword(password))
		return { error: "Password does not meet requirements" };

	const user = new User();
	user.name = name;
	user.email = email;
	user.dob = dob;
	user.hash = hashString(password);
	return { user: user };
};
