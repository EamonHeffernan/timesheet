import express, { CookieOptions } from "express";
import next from "next";
import cookieParser from "cookie-parser";
import cors from "cors";

require("./model/db");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

const cookieSecret = process.env.COOKIE_SECRET || "DefaultCookieSecret";
export const maxSessionLength = 86400000;
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: "strict",
	maxAge: maxSessionLength,
	secure: !dev,
};

nextApp.prepare().then(() => {
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser(cookieSecret));

	app.use("/api/users", require("./users/route"));
	app.use("/api/staff", require("./staff/route"));
	app.use("/api/admin", require("./admin/route"));

	app.get("*", (req, res) => {
		return handle(req, res);
	});
});

export default app;
