/*
 * @Script: app.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-06-01 13:11:41
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-02 21:39:25
 * @Description: Base file that calls the routes for express.
 */

import express from "express";
import next from "next";

import config, { prod } from "./config";
import router from "./routes/router";

export * from "./config";

import "./httpResponses";
import { errorCatcher } from "./logger";

const nodePackage = require("../package.json");

// Add next app to the project.
export const nextApp = next({ dev: !prod, dir: "./" + nodePackage.dirs.next });
// Create next handler
const handle = nextApp.getRequestHandler();

// Create express app that handles requests.
const app = express();

/**
 * Setup for express routes and middleware.
 */
export const setup = () => {
	config(app);
	router(app, handle);

	app.use(errorCatcher);
};

export default app;
