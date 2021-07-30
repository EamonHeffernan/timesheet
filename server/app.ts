import cookieParser from "cookie-parser";
import cors from "cors";
import express, { CookieOptions } from "express";
import next from "next";

import router from "./routes/router";

export const prod = process.env.NODE_ENV === "production";
export const test = process.env.NODE_ENV === "test";

const nodePackage = require("../package.json");

const nextApp = next({ dev: !prod, dir: "./" + nodePackage.dirs.next });
const handle = nextApp.getRequestHandler();
const app = express();

const cookieSecret = process.env.COOKIE_SECRET || "DefaultCookieSecret";
export const maxSessionLength = 86400000;
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: "strict",
	maxAge: maxSessionLength,
	secure: prod,
};

nextApp.prepare().then(() => {
	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser(cookieSecret));

	router(app);

	app.get("*", (req, res) => {
		return handle(req, res);
	});

	app.get("*", (req, res) => {
		return res.send("Error, please refresh the page.");
	});
});

export default app;
