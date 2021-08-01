import express from "express";
import next from "next";

import config, { prod } from "./config";
import router from "./routes/router";

export * from "./config";

import "./httpResponses";
import { errorCatcher } from "./logger";

const nodePackage = require("../package.json");

export const nextApp = next({ dev: !prod, dir: "./" + nodePackage.dirs.next });
const handle = nextApp.getRequestHandler();

const app = express();

export const setup = () => {
	config(app);
	router(app, handle);
	app.use(errorCatcher);
};

export default app;
