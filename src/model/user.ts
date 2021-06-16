import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	dob: Date;
	hash: string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	dob: { type: Date, required: true },
	hash: { type: String, required: true, unique: true },
});

// Export the model and return your IUser interface
export const User = mongoose.model<IUser>("User", UserSchema);
