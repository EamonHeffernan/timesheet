import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

const UserSchema = createSchema({
	email: Type.string({ required: true, unique: true }),
	name: Type.string({ required: true, unique: false }),
	dob: Type.date({ required: true, unique: false }),
	hash: Type.string({ required: true, unique: true }),
	admin: Type.boolean({ required: true, unique: false }),
	sessionKey: Type.string({ required: false, unique: false }),
	days: Type.array({ required: false }).of({
		start: Type.date({ required: true }),
		end: Type.date({ required: true }),
		breaks: Type.array({ required: false }).of({
			start: Type.date({ required: true }),
			end: Type.date({ required: true }),
		}),
		duration: Type.number({ required: false }),
	}),
});

// Export the model and return your IUser interface
export const User = typedModel("User", UserSchema);
export type IUser = ExtractDoc<typeof UserSchema>;
