import cookieParser from "cookie-parser";
import cors from "cors";
import express, { CookieOptions } from "express";
import next from "next";

require("./model/db");
export const prod = process.env.NODE_ENV === "production";
export const test = process.env.NODE_ENV === "test";
const nextApp = next({ dev: !prod });
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

	app.use("/api/users", require("./routes/users/route"));
	app.use("/api/staff", require("./routes/staff/route"));
	app.use("/api/admin", require("./routes/admin/route"));

	app.get("*", (req, res) => {
		return handle(req, res);
	});

	app.get("*", (req, res) => {
		return res.send("Error, please refresh the page.");
	});
});

export default app;
