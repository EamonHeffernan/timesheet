/*
 * @Script: cookieHandler.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-08 06:57:50
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 15:51:22
 * @Description: Saves and clears sessionKeys from users.
 */

import express from "express";

import { cookieOptions } from "../../app";

/**
 * Save a sessionKey cookie to res.
 * @param res Express response to save cookie to.
 * @param sessionKey Key to save.
 */
export const saveSessionKey = (res: express.Response, sessionKey: string) => {
	res.cookie("sessionKey", sessionKey, cookieOptions);
};

/**
 * Remove sessionKey cookie from res.
 * @param res Express response to remove cookie from.
 */
export const clearSessionKey = (res: express.Response) => {
	res.clearCookie("sessionKey");
};
