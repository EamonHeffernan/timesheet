/*
 * @Script: cookieHandler.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-08 06:57:50
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 13:55:53
 * @Description: Saves and clears sessionKeys from users.
 */

import express from "express";

import { cookieOptions } from "../../app";

export const saveSessionKey = (res: express.Response, sessionKey: string) => {
	res.cookie("sessionKey", sessionKey, cookieOptions);
};

export const clearSessionKey = (res: express.Response) => {
	res.clearCookie("sessionKey");
};
