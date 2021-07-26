import express from "express";
import { cookieOptions } from "../app";

export const saveSessionKey = (
	res: express.Response,
	accountId: string,
	sessionKey: string
) => {
	res.cookie("sessionKey", sessionKey, cookieOptions);
};

export const clearSessionKey = (res: express.Response) => {
	res.clearCookie("sessionKey");
};
