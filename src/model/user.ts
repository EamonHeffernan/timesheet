import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	dob: Date;
	hash: string;
	admin: boolean;
	sessionKey: string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	dob: { type: Date, required: true },
	hash: { type: String, required: true, unique: true },
	admin: { type: Boolean, required: true },
	sessionKey: { type: String, required: false },
});

// Export the model and return your IUser interface
export const User = mongoose.model<IUser>("User", UserSchema);
