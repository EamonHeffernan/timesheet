/*
 * @Script: changeRequest.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-14 11:36:56
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:02:44
 * @Description: Lays out the schematic for the ChangeRequest Class.
 */

import { DocumentType, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";

import { DayClass, UserClass } from "./user";

@modelOptions({ schemaOptions: { collection: "changeRequests" } })
export class ChangeRequestClass {
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
