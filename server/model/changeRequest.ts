import {
	DocumentType,
	getModelForClass,
	modelOptions,
	prop,
	Ref,
} from "@typegoose/typegoose";

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
