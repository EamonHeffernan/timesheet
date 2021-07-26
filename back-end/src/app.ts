import express, { CookieOptions } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

require("./model/db");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieSecret = process.env.COOKIE_SECRET || "DefaultCookieSecret";
export const maxSessionLength = 86400000;
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: "strict",
	maxAge: maxSessionLength,
	secure: process.env.NODE_ENV === "production",
};

app.use(cookieParser(cookieSecret));

app.use("/api/users", require("./users/route"));
app.use("/api/staff", require("./staff/route"));
app.use("/api/admin", require("./admin/route"));

export default app;
