import { useState } from "react";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch("http://localhost:5000/api/users/signin/", {
				body: JSON.stringify({
					email: email,
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
			alert("Unknown error occurred");
		}
	};

	return (
		<form onSubmit={signIn}>
			<label htmlFor='email'>Email: </label>
			<input
				onInput={(e) => setEmail(e.currentTarget.value)}
				type='email'
				autoComplete='email'
				required
			/>
			<br />
			<label htmlFor='password'>Password: </label>
			<input
				onInput={(e) => setPassword(e.currentTarget.value)}
				type='password'
				required
			/>
			<br />
			<button type='submit'>Sign In</button>
		</form>
	);
}
