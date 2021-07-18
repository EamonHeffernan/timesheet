import express from "express";

export const saveSessionKey = (
	res: express.Response,
	accountId: string,
	sessionKey: string
) => {
	res.cookie("accountId", accountId);
	res.cookie("sessionKey", sessionKey);
};
