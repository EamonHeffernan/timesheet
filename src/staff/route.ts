import express from "express";
import { stringToDate } from "../dataValidation/dataValidator";
import { returnCode } from "../httpResponses";
import { InputType, validateInput } from "../dataValidation/inputValidator";
import { authenticate } from "../users/middleware";
import { addDay } from "./staffHandler";

const router = express.Router();

module.exports = router;

router.post(
	"/submitDay",
	authenticate(false),
	validateInput([
		{ name: "start", type: InputType.Date },
		{ name: "end", type: InputType.Date },
	]),
	async (req, res) => {
		//Check and validate breaks
		let validBreaks: Array<any> = [];
		if ("breaks" in req.body && Array.isArray(req.body.breaks)) {
			const breaks: Array<any> = req.body.breaks;
			for (let i = 0; i < breaks.length; i++) {
				if (typeof breaks[i] == "object") {
					if ("start" in breaks[i] && "end" in breaks[i]) {
						if (
							typeof breaks[i].start == "string" &&
							typeof breaks[i].end == "string"
						) {
							const start = stringToDate(breaks[i].start);
							const end = stringToDate(breaks[i].end);
							if (start != null && end != null) {
								validBreaks.push({ start: start, end: end });
								break;
							}
						}
					}
				}
				return returnCode(res, 400, "Breaks not formatted correctly");
			}
		}
		if (addDay(res.locals.user, req.body.start, req.body.end, validBreaks)) {
			return returnCode(res, 200);
		} else {
			return returnCode(res, 400, "Breaks not formatted correctly");
		}
	}
);

router.get(
	"/getDays",
	authenticate(false),
	validateInput([{ name: "duration", type: InputType.Number }]),
	() => {}
);
