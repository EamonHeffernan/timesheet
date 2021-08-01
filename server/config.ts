import cookieParser from "cookie-parser";
import cors from "cors";
import express, { CookieOptions } from "express";
import { errorCatcher } from "./logger";

export const prod = process.env.NODE_ENV === "production";
export const test = process.env.NODE_ENV === "test";

const cookieSecret = process.env.COOKIE_SECRET;
export const maxSessionLength = 86400000;
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: "strict",
	maxAge: maxSessionLength,
	secure: prod,
};

export default (app: express.Application) => {
	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser(cookieSecret));
};
