import { useRouter } from "next/router";
import { useState } from "react";
import { request } from "../pages/_app";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const signIn = async (event) => {
		try {
			event.preventDefault();

			const res = await request("/api/users/signin/", "POST", {
				email,
				password,
			});

			if (res.status == 200) {
				router.push("/staff/submit");
			} else if (res.status == 400) {
				alert("Username and password incorrect");
			} else {
				alert((await res.json()).message);
			}
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
