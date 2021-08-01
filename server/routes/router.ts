/*
 * @Script: router.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-30 13:14:58
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 17:09:21
 * @Description: Contains all express routes.
 */

import express from "express";

/**
 * Adds the routes for express and next.
 * @param app Express app.
 * @param handle Next.js Handle
 */
export default (app: express.Application, handle: any) => {
	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));

	app.use("/api", (req, res) => {
		return res.returnCode(404, `Cannot ${req.method} ${req.url}`);
	});

	app.get("/teapot", (req, res) => {
		return res.status(418).send("<h1>I'm a teapot.</h1>");
	});

	app.get("*", (req, res) => {
		return handle(req, res);
	});
};
