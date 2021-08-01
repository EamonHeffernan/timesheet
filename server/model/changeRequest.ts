/*
 * @Script: changeRequest.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-14 11:36:56
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:39:21
 * @Description: Lays out the schematic for the ChangeRequest Class.
 */

import { DocumentType, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";

import { DayClass, UserClass } from "./user";

// Change Request schema
@modelOptions({ schemaOptions: { collection: "changeRequests" } })
export class ChangeRequestClass {
	// Using reference to the User class.
	// Doesn't store info of reference class
	// but the information can be filled in when needed.
	@prop({ ref: () => UserClass })
	staff: Ref<UserClass>;
	@prop({ type: () => DayClass })
	newDay: DayClass;
	@prop({ type: () => DayClass })
	oldDay: DayClass;
	@prop()
	timestamp: Date;
}

// Export the model
export const ChangeRequest = getModelForClass(ChangeRequestClass);
export type IChangeRequest = DocumentType<ChangeRequestClass>;
