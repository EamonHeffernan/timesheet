import { useState } from "react";
import { request } from "../pages/_app";

export default function ResetPasswordForm() {
	const [password, setPassword] = useState("");
	const resetPassword = async (event) => {
		try {
			event.preventDefault();
			const res = await request("/api/users/resetPassword", "POST", {
				password: password,
			})

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
				onInput={(e) => setPassword(e.currentTarget.value)}
				type='password'
				autoComplete='password'
				required
			/>
			<br />
			<button type='submit'>Reset Password</button>
		</form>
	);
}
