import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

import { DayClass } from "./user";

@modelOptions({ schemaOptions: { collection: "changeRequests" } })
export class ChangeRequestClass {
	@prop()
	staffId: string;
	@prop({ type: () => DayClass })
	newDay: DayClass;
	@prop()
	timestamp: Date;
}

// Export the model
export const ChangeRequest = getModelForClass(ChangeRequestClass);
export type IChangeRequest = DocumentType<ChangeRequestClass>;
