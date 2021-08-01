/*
 * @Script: user.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-16 12:44:59
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:00:37
 * @Description: Lays out the schematic for the User class.
 */

import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { _id: false } })
class BreakClass {
	@prop()
	public start: Date;
	@prop()
	public end: Date;
}

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

@modelOptions({ schemaOptions: { _id: false } })
class TokenClass {
	@prop()
	public key: string;
	@prop()
	public timeStamp: Date;
}

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

// Export the model
export const User = getModelForClass(UserClass);
export type IUser = DocumentType<UserClass>;
export type IToken = TokenClass;
export type IDay = DayClass;
export type IBreak = BreakClass;
