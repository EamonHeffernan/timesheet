import { useState } from "react";

import { parseDateString, request } from "../../pages/_app";
import FormLayout from "../forms/form-layout";
import styles from "../../styles/form-page.module.css";

export default function DateForm({ children, pageName }) {
	const [dayComplete, setDayComplete] = useState(false);
	const [date, setDate] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [breaks, setBreaks] = useState([{}]);

	const setCurrentBreak = (key, value) => {
		const breaksCopy = [...breaks];
		breaksCopy[breaksCopy.length - 1][key] = value;
		setBreaks(breaksCopy);
		console.log(breaks);
	};

	const submitDay = () => {
		try {
			setStart(parseDateString(date, start));
			setEnd(parseDateString(date, end));
			if (confirm("Would you like to add a break?")) {
				setDayComplete(true);
			} else {
				post();
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
		if (confirm("Would you like to add another break?")) {
			console.log("Reset");
		} else {
			post();
		}
	};

	const post = () => {};

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
							onChange={(e) => setCurrentBreak("start", e.currentTarget.value)}
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
							onInput={(e) => setCurrentBreak("end", e.currentTarget.value)}
							type='time'
							required
							className={styles["input-field"]}
						/>
					</div>
				</FormLayout>
			)}
			<div>P</div>
		</>
	);
}
