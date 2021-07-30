import express from "express";

export default (app: express.Application) => {
	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));
};
