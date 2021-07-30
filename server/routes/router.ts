import express from "express";

export default (app: express.Application, handle: (...args: any[]) => any) => {
	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));

	app.use("/api", (req, res) => {
		req["test"]();
		return res.returnCode(404, `Cannot ${req.method} ${req.url}`);
	});

	app.get("*", (req, res) => {
		return handle(req, res);
	});
};
