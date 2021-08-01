/*
 * @Script: forgot-password-form.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:19:21
 * @Description: Contains the form for forgot-password.
 */

import { useState } from "react";

import { request } from "../../pages/_app";
import styles from "../../styles/form-page.module.css";
import FormLayout from "./form-layout";

export default function ForgotPasswordForm({ children, pageName }) {
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
		<FormLayout
			pageName={pageName}
			onSubmit={forgotPassword}
			bottomBox={children}
		>
			<div className={styles["input"]}>
				<label htmlFor='email' className={styles["input-label"]}>
					Email:{" "}
				</label>
				<input
					onInput={(e) => setEmail(e.currentTarget.value)}
					type='email'
					autoComplete='email'
					required
					className={styles["input-field"]}
				/>
			</div>
		</FormLayout>
	);
}
