import express from "express";
import { returnCode } from "../httpResponses";

export default (app: express.Application, handle: (...args: any[]) => any) => {
	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));

	app.use("/api", (req, res) => {
		return returnCode(res, 404, `Cannot ${req.method} ${req.url}`);
	});

	app.get("*", (req, res) => {
		return handle(req, res);
	});
};
