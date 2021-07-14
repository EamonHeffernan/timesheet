import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

const ChangeRequestSchema = createSchema({
	staffId: Type.string({ required: true, unique: false }),
	newDay: Type.object({ required: true, unique: false }).of({
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
export const ChangeRequest = typedModel("changeRequest", ChangeRequestSchema);
export type IChangeRequest = ExtractDoc<typeof ChangeRequestSchema>;
