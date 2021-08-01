/*
 * @Script: reset-password-form.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:34:11
 * @Description: The form for password resets.
 */
import { useRouter } from "next/router";
import { useState } from "react";

import { request } from "../../pages/_app";
import styles from "../../styles/form-page.module.css";
import FormLayout from "./form-layout";

export default function ResetPasswordForm({ children, pageName, token }) {
	const router = useRouter();
	const [password, setPassword] = useState("");
	/**
	 * Post to the reset password endpoint with state.
	 */
	const resetPassword = async (event) => {
		try {
			event.preventDefault();
			const res = await request("/api/users/resetPassword", "POST", {
				key: token,
				password,
			});

			const result = await res.json();
			if (result.message === "BAD REQUEST: password is not valid.") {
				alert(
					"Password must have between 8 and 72 characters, upper and lowercase and at least one number"
				);
			} else {
				alert(result.message);
			}
			if (res.ok) router.push("/");
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
