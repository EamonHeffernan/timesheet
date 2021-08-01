/*
 * @Script: router.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-30 13:14:58
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 13:48:32
 * @Description: Contains all express routes.
 */

import express from "express";

export default (app: express.Application, handle: (...args: any[]) => any) => {
	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));

	app.use("/api", (req, res) => {
		return res.returnCode(404, `Cannot ${req.method} ${req.url}`);
	});

	app.get("*", (req, res) => {
		return handle(req, res);
	});
};
