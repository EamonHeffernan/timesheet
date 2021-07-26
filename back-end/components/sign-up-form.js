export default function SignUpForm() {
	const signUp = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch("http://localhost:5000/api/users/signup", {
				body: JSON.stringify({
					email: event.target.email.value,
					password: event.target.password.value,
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
		<form onSubmit={signUp}>
			<label htmlFor='name'>Name: </label>
			<input id='name' name='name' type='text' autoComplete='name' required />
			<br />
			<label htmlFor='email'>Email: </label>
			<input
				id='email'
				name='email'
				type='email'
				autoComplete='email'
				required
			/>
			<br />
			<label htmlFor='password'>Password: </label>
			<input id='password' name='password' type='password' required />
			<br />
			<label htmlFor='dob'>DOB: </label>
			<input id='dob' name='dob' type='date' required />
			<br />
			<button type='submit'>Sign Up</button>
		</form>
	);
}
