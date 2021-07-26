import { useState } from "react";

export default function ResetPasswordForm() {
	const [password, setPassword] = useState("");
	const resetPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch("http://localhost:5000/api/users/resetPassword", {
				body: JSON.stringify({
					password: password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				credentials: "include",
			});

			const result = await res.json();

			alert(result.message);
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<form onSubmit={resetPassword}>
			<label htmlFor='password'>Password: </label>
			<input
				onInput={(e) => setPassword(e.target.value)}
				type='password'
				autoComplete='password'
				required
			/>
			<br />
			<button type='submit'>Reset Password</button>
		</form>
	);
}
