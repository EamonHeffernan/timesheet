import "../styles/global.css";
import path from "path";

export const serverFiles = path.resolve(
	path.join("../", process.env.NODE_ENV === "production" ? "dist" : "server")
);

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export const request = async (
	url: string,
	method: string,
	body: object = {},
	headers: HeadersInit = {}
) => {
	const postHeaders = {
		"Content-Type": "application/json",
	};
	headers = {
		...(method === "POST" ? postHeaders : {}),
		...headers,
	};
	return fetch(url, {
		method,
		headers,
		body: JSON.stringify(body),
		credentials: "same-origin",
	});
};
