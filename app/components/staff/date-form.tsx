import { useState } from "react";

import { request } from "../../pages/_app";
import BreakForm from "./break-form";

export default function DateForm() {
	const [date, setDate] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [breaks, setBreaks] = useState(4);

	const forgotPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await request("/api/users/forgotPassword", "POST", {
				email: start,
			});

			const result = await res.json();

			alert(result.message);
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<form onSubmit={forgotPassword}>
			<label htmlFor='date'>Date: </label>
			<input
				onInput={(e) => setDate(e.currentTarget.value)}
				type='date'
				required
			/>
			<br />
			<label htmlFor='start'>Start: </label>
			<input
				onInput={(e) => setStart(e.currentTarget.value)}
				type='time'
				required
			/>
			<label htmlFor='end'>End: </label>
			<input
				onInput={(e) => setEnd(e.currentTarget.value)}
				type='time'
				required
			/>
			<button type='submit'>Reset Password</button>
		</form>
	);
}
