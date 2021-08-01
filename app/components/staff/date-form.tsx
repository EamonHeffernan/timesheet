/*
 * @Script: date-form.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-27 01:20:44
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:27:04
 * @Description: Form for submitting dates.
 */

import { useState } from "react";

import { parseDateString, request } from "../../pages/_app";
import FormLayout from "../forms/form-layout";
import styles from "../../styles/form-page.module.css";
import { useRouter } from "next/router";

export default function DateForm({ children, pageName }) {
	const [dayComplete, setDayComplete] = useState(false);
	const [date, setDate] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [breaks, setBreaks] = useState([]);

	const router = useRouter();

	const setCurrentBreak = (key, value) => {
		const breaksCopy = [...breaks];
		breaksCopy[breaksCopy.length - 1][key] = value;
		setBreaks(breaksCopy);
	};

	const submitDay = (event) => {
		try {
			event.preventDefault();
			if (confirm("Would you like to add a break?")) {
				setDayComplete(true);
				setBreaks([{}]);
			} else {
				post(event);
			}
			if (start === "" || end === "") {
				setDayComplete(false);
				alert("An error occurred while saving your dates, please try again.");
			}
		} catch (error) {
			setDayComplete(false);
			console.error(error);
		}
	};

	const submitBreak = (event) => {
		event.preventDefault();
		if (confirm("Would you like to add another break?")) {
			event.currentTarget.reset();
			setBreaks([...breaks, {}]);
		} else {
			post(event);
		}
	};

	const post = async (event) => {
		try {
			event.preventDefault();
			const res = await request("/api/staff/submitDay", "POST", {
				day: {
					start: parseDateString(date, start),
					end: parseDateString(date, end),
					breaks,
				},
			});

			const result = await res.json();

			alert(result.message);
			if (res.ok) {
				request("/api/users/signOut", "POST");
				router.push("/");
			}
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<>
			{!dayComplete && (
				<FormLayout
					pageName={pageName}
					onSubmit={submitDay}
					bottomBox={children}
				>
					<div className={styles["input"]}>
						<label htmlFor='date' className={styles["input-label"]}>
							Date:{" "}
						</label>
						<input
							onInput={(e) => setDate(e.currentTarget.value)}
							type='date'
							required
							className={styles["input-field"]}
						/>
					</div>
					<div className={styles["input"]}>
						<label htmlFor='start' className={styles["input-label"]}>
							Start:{" "}
						</label>
						<input
							onChange={(e) => setStart(e.currentTarget.value)}
							type='time'
							required
							className={styles["input-field"]}
						/>
					</div>
					<div className={styles["input"]}>
						<label htmlFor='end' className={styles["input-label"]}>
							End:{" "}
						</label>
						<input
							onInput={(e) => setEnd(e.currentTarget.value)}
							type='time'
							required
							className={styles["input-field"]}
						/>
					</div>
				</FormLayout>
			)}
			{dayComplete && (
				<FormLayout
					pageName={pageName}
					onSubmit={submitBreak}
					bottomBox={children}
				>
					<div className={styles["input"]}>
						<label htmlFor='start' className={styles["input-label"]}>
							Start:{" "}
						</label>
						<input
							onChange={(e) =>
								setCurrentBreak(
									"start",
									parseDateString(date, e.currentTarget.value)
								)
							}
							type='time'
							required
							className={styles["input-field"]}
						/>
					</div>
					<div className={styles["input"]}>
						<label htmlFor='end' className={styles["input-label"]}>
							End:{" "}
						</label>
						<input
							onInput={(e) =>
								setCurrentBreak(
									"end",
									parseDateString(date, e.currentTarget.value)
								)
							}
							type='time'
							required
							className={styles["input-field"]}
						/>
					</div>
				</FormLayout>
			)}
		</>
	);
}
