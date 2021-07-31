import { useState } from "react";

import { request } from "../../pages/_app";
import styles from "../../styles/form-page.module.css";
import FormLayout from "./form-layout";

export default function ResetPasswordForm({ children, pageName }) {
	const [password, setPassword] = useState("");
	const resetPassword = async (event) => {
		try {
			event.preventDefault();
			const res = await request("/api/users/resetPassword", "POST", {
				password: password,
			});

			const result = await res.json();

			alert(result.message);
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<FormLayout
			pageName={pageName}
			onSubmit={resetPassword}
			bottomBox={children}
		>
			<div className={styles["input"]}>
				<label htmlFor='password' className={styles["input-label"]}>
					Password:{" "}
				</label>
				<input
					onInput={(e) => setPassword(e.currentTarget.value)}
					type='password'
					autoComplete='password'
					required
					className={styles["input-field"]}
				/>
			</div>
		</FormLayout>
	);
}
