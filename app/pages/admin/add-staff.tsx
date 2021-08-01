/*
 * @Script: add-staff.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 01:46:36
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:32:49
 * @Description: Page for adding new staff.
 */

import { useRouter } from "next/router";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import styles from "../../styles/add-staff.layout.module.css";
import { parseDateString, request } from "../_app";

export default function AddStaff() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");

	const router = useRouter();

	const addStaff = async (event) => {
		try {
			console.log(parseDateString(dob));
			event.preventDefault();
			const res = await request("/api/users/signUp", "POST", {
				email,
				name,
				dob: parseDateString(dob),
			});

			const result = await res.json();

			alert(result.message);

			router.push("/admin");
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<AdminLayout pageName='Add Staff' className={styles["base-container"]}>
			<div className={styles["title"]}>Add Staff</div>
			<form className={styles["form-container"]} onSubmit={addStaff}>
				<div className={styles["input-container"]}>
					<label>Email: </label>
					<input
						onInput={(e) => setEmail(e.currentTarget.value)}
						type='email'
						autoComplete='email'
						required
					/>
				</div>
				<div className={styles["input-container"]}>
					<label>Name: </label>
					<input
						onInput={(e) => setName(e.currentTarget.value)}
						autoComplete='name'
						required
					/>
				</div>
				<div className={styles["input-container"]}>
					<label>Date of Birth: </label>
					<input
						onInput={(e) => setDob(e.currentTarget.value)}
						type='date'
						required
					/>
				</div>
				<div className={styles["submit-button"]}>
					<button type='submit'>Add Staff Member</button>
				</div>
			</form>
		</AdminLayout>
	);
}
