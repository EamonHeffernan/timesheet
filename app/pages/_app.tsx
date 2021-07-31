import path from "path";

import "../styles/global.css";

export const fetcher = (url) =>
	fetch(url, { credentials: "include" }).then((res) => res.json());

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

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
