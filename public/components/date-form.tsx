import { useState } from "react";
import BreakForm from "./break-form";

export default function DateForm() {
	const [date, setDate] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [breaks, setBreaks] = useState(4);

	const forgotPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch(
				"http://localhost:5000/api/users/forgotPassword",
				{
					body: JSON.stringify({
						email: start,
					}),
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					credentials: "include",
				}
			);

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
			<br />
			{[...Array(breaks)].map((e, i) => (
				<BreakForm />
			))}
			<button type='submit'>Reset Password</button>
		</form>
	);
}
