export default function ForgotPasswordForm() {
	const forgotPassword = async (event) => {
		try {
			event.preventDefault();

			const res = await fetch(
				"http://localhost:5000/api/users/forgotPassword",
				{
					body: JSON.stringify({
						email: event.target.email.value,
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
				id='email'
				name='email'
				type='email'
				autoComplete='email'
				required
			/>
			<br />
			<button type='submit'>Reset Password</button>
		</form>
	);
}
