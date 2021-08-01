/*
 * @Script: _app.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:25:57
 * @Description: Global code, always loaded.
 */

import "../styles/global.css";

export const fetcher = (url) =>
	fetch(url, { credentials: "include" }).then((res) => res.json());

/**
 * All components run through this.
 */
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

/**
 * Simpler wrapper for request.
 * @param url URL to request to
 * @param method HTTP Method
 * @param body Body contents
 * @param headers Header contents
 * @returns Results
 */
export const request = async (
	url: string,
	method: string,
	body: object = undefined,
	headers: HeadersInit = {}
) => {
	const postHeaders = {
		"Content-Type": "application/json",
	};
	headers = {
		...(body !== undefined ? postHeaders : {}),
		...headers,
	};

	return fetch(url, {
		method,
		headers,
		body: body !== undefined ? JSON.stringify(body) : undefined,
		credentials: "same-origin",
	});
};

/**
 * Turns key pair object into cookie string.
 * @param input Cookie object
 * @returns Cookie string
 */
export const parseCookies = (input) => {
	let returnString = "";
	for (let key in input) {
		if (returnString !== "") {
			returnString += "; ";
		}
		returnString += `${key}=${input[key]}`;
	}
	return returnString;
};

/**
 * Turns date and time into ISO string.
 * @param date Date string
 * @param time Time string
 * @returns ISO string
 */
export const parseDateString = (date: string, time: string = "") => {
	if (date != "") {
		if (time != "") {
			date += "T" + time + "Z";
		}

		const d = new Date(date);

		if (!isNaN(d.getTime())) {
			return d.toISOString();
		}
	}
	return "";
};

/**
 * Formats time nicely
 * @param input Date string
 * @returns Formatted time string.
 */
export const getTime = (input) => {
	const date = new Date(input);
	let hours = date.getUTCHours();
	let pm = false;
	if (hours > 12) {
		hours -= 12;
		pm = true;
	}
	return `${hours}:${(date.getUTCMinutes() + "").padStart(2, "0")}${
		!pm ? "am" : "pm"
	}`;
};
