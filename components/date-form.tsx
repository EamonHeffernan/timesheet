import { useState } from "react";

export default function DateForm() {
	const [email, setEmail] = useState("");
	const forgotPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch(
				"http://localhost:5000/api/users/forgotPassword",
				{
					body: JSON.stringify({
						email: email,
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
			<label htmlFor='email'>Email: </label>
			<input
				onInput={(e) => setEmail(e.currentTarget.value)}
				type='email'
				autoComplete='email'
				required
			/>
			<br />
			<button type='submit'>Reset Password</button>
		</form>
	);
}
