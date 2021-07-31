import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import styles from "../../styles/add-staff.layout.module.css";

export default function AddStaff() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");

	return (
		<AdminLayout pageName='Add Staff' className={styles["base-container"]}>
			<div className={styles["title"]}>Add Staff</div>
			<form className={styles["form-container"]}>
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
						type='time'
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
