import e from "express";
import Link from "next/link";
import { getTime } from "../../pages/_app";

import styles from "../../styles/day-grid.module.css";

export default function DayGrid({ staffData }) {
	return (
		<div className={styles["day-grid-container"]}>
			<div className={styles["header"]}>
				<div className={styles["header-child"]}>Date</div>
				<div className={styles["header-child"]}>Start time</div>
				<div className={styles["header-child"]}>End time</div>
				<div className={styles["header-child"]}>Hours worked</div>
				<div className={styles["header-child"]}>Break time</div>
			</div>
			<div className={styles["day-grid"]}>
				{staffData.days.length > 0 &&
					staffData.days.map((e, i) => {
						return (
							<div className={styles["single-day-container"]} key={e.id}>
								<div className={styles["day-info"]}>
									{new Date(e.start).toDateString()}
								</div>
								<div className={styles["day-info"]}>{getTime(e.start)}</div>
								<div className={styles["day-info"]}>{getTime(e.end)}</div>
								<div className={styles["day-info"]}>
									{(e.duration / 60).toFixed(1)}
								</div>
								<div className={styles["day-info"]}>
									{(breakTime(e) / 60).toFixed(1)}
								</div>
							</div>
						);
					})}
				{staffData.days.length == 0 && (
					<div className={styles["single-day-container"]}>
						<div className={styles["day-info"]}></div>
						<div className={styles["day-info"]}></div>
						<div className={styles["day-info"]}></div>
						<div className={styles["day-info"]}></div>
						<div className={styles["day-info"]}></div>
					</div>
				)}
			</div>
		</div>
	);
}

const breakTime = (info) => {
	const start = new Date(info.start);
	const end = new Date(info.end);

	console.log();

	return (end.getTime() - start.getTime()) / 60000 - info.duration;
};
