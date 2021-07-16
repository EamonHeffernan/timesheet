import {
	getModelForClass,
	prop,
	DocumentType,
	modelOptions,
} from "@typegoose/typegoose";

export class BreakClass {
	@prop()
	public start: Date;
	@prop()
	public end: Date;
}

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
	public sessionKey?: string;
	@prop({ type: () => DayClass })
	public days?: DayClass[];
}

export const sendableUser = (user: IUser) => {
	return { email: user.email, name: user.name, dob: user.dob };
};

// Export the model
export const User = getModelForClass(UserClass);
export type IUser = DocumentType<UserClass>;
export const Day = DayClass;
export type IDay = DayClass;
export const Break = BreakClass;
export type IBreak = BreakClass;
