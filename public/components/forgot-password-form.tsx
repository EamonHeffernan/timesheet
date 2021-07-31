import { useState } from "react";
import { request } from "../pages/_app";

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState("");
	const forgotPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await request("/api/users/forgotPassword", "POST", {
				email: email,
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
