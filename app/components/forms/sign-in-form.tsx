/*
 * @Script: sign-in-form.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:20:44
 * @Description: Form to sign in.
 */
import { useRouter } from "next/router";
import React, { useState } from "react";

import { request } from "../../pages/_app";
import styles from "../../styles/form-page.module.css";
import FormLayout from "./form-layout";

export default function SignInForm({ children, pageName }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const checkAccount = async () => {
		const res = await request("/api/users", "GET");
		if (res.ok) {
			const result = await res.json();
			if (result.data.admin) {
				router.push("/admin");
			} else {
				router.push("/staff/submit");
			}
		}
	};
	checkAccount();

	const signIn = async (event) => {
		try {
			event.preventDefault();

			const res = await request("/api/users/signin/", "POST", {
				email,
				password,
			});
			const response = await res.json();
			if (res.status == 200) {
				if (response.data.admin) {
					router.push("/admin");
				} else {
					router.push("/staff/submit");
				}
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
		<FormLayout pageName={pageName} onSubmit={signIn} bottomBox={children}>
			<div className={styles["input"]}>
				<div className={styles["input-label"]}>
					<label htmlFor='email'>Email: </label>
				</div>
				<input
					onInput={(e) => setEmail(e.currentTarget.value)}
					type='email'
					autoComplete='email'
					required
					className={styles["input-field"]}
				/>
			</div>
			<div className={styles["input"]}>
				<label htmlFor='password' className={styles["input-label"]}>
					Password:{" "}
				</label>
				<input
					onInput={(e) => setPassword(e.currentTarget.value)}
					type='password'
					required
					className={styles["input-field"]}
				/>
			</div>
		</FormLayout>
	);
}
