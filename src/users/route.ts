import express = require("express");
import errorHandler from "../errorHandler";
import { signUp } from "./userHandler";

const router = express.Router();

module.exports = router;

router.post("/signUp", async (req, res) => {
	try {
		// Validate existence and type here
		signUp("jim", "my", new Date(), "si");
		res.send("Signed up");
	} catch (err) {
		errorHandler(err, res);
	}
});
