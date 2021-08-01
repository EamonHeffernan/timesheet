/*
 * @Script: user.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-16 12:44:59
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:34:28
 * @Description: Lays out the schematic for the User class.
 */

import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

// Define simple type for break with only 2 properties.
// This allows referencing the type in the project
// to make working with Breaks more efficient.
@modelOptions({ schemaOptions: { _id: false } })
class BreakClass {
	@prop()
	public start: Date;
	@prop()
	public end: Date;
}

// Day type contains more, and is used by both the user and changeRequest.
// Therefore breaking it up removes writing the same Class twice.
@modelOptions({ schemaOptions: { _id: false } })
export class DayClass {
	@prop()
	public start: Date;
	@prop()
	public end: Date;
	@prop({ type: () => BreakClass })
	public breaks?: BreakClass[];
	@prop()
	public duration: number;
}

// Token is also used multiple times and benefits from the same reasons.
@modelOptions({ schemaOptions: { _id: false } })
class TokenClass {
	@prop()
	public key: string;
	@prop()
	public timeStamp: Date;
}

// Full data dictionary of the user class. Collection is set to users,
// meaning it saves to its own collection in the db
@modelOptions({ schemaOptions: { collection: "users" } })
export class UserClass {
	@prop({ index: true, unique: true })
	public email: string;
	@prop()
	public name: string;
	@prop()
	public dob: Date;
	@prop()
	public hash: string;
	@prop({ default: false, index: true })
	public admin: boolean;
	@prop()
	public sessionKey?: TokenClass;
	@prop()
	public accountCreated: boolean;
	@prop()
	public passwordResetToken?: TokenClass;
	@prop({ type: () => DayClass })
	public days: DayClass[];

	// public function on class returning a more sendable version of itself.
	public sendableUser(this: IUser) {
		return {
			id: this.id,
			email: this.email,
			name: this.name,
			dob: this.dob,
			admin: this.admin,
			days: this.days,
		};
	}
}

// Export the model to types.
export const User = getModelForClass(UserClass);
export type IUser = DocumentType<UserClass>;
export type IToken = TokenClass;
export type IDay = DayClass;
export type IBreak = BreakClass;
