/*
 * @Script: config.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-30 14:22:08
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 15:05:58
 * @Description: Holds config and middleware for express.
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { CookieOptions } from "express";

// Get info from environment variables.
export const prod = process.env.NODE_ENV === "production";
export const test = process.env.NODE_ENV === "test";

// Cookie secret is used to encrypt cookies.
const cookieSecret = process.env.COOKIE_SECRET;

// Cookie options, are applied to all cookies.
export const maxSessionLength = 86400000; // 1 day
export const cookieOptions: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: "strict",
	maxAge: maxSessionLength,
	secure: prod, // Only use secure mode in production
};

// Set middleware for use with all express requests.
export default (app: express.Application) => {
	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser(cookieSecret));
};
