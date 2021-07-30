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
	public passwordResetToken?: TokenClass;
	@prop({ type: () => DayClass })
	public days: DayClass[];

	public sendableUser(this: IUser) {
		return {
			email: this.email,
			name: this.name,
			dob: this.dob,
			admin: this.admin,
		};
	}
}

// Export the model
export const User = getModelForClass(UserClass);
export type IUser = DocumentType<UserClass>;
export type IToken = TokenClass;
export type IDay = DayClass;
export type IBreak = BreakClass;
