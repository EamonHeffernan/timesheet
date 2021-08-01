/*
 * @Script: staff-grid.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-31 08:06:02
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:28:52
 * @Description: Grid off staff, shown to admin.
 */

import Link from "next/link";

import styles from "../../styles/staff-grid.module.css";

export default function StaffGrid({ staffData }) {
	staffData.sort(compareDates);
	staffData.reverse();
	return (
		<>
			<div className={styles["header"]}>
				<div className={styles["header-child"]}>Name</div>
				<div className={styles["header-child"]}>Last work day</div>
				<div className={styles["header-child"]}>Hours worked this week</div>
				<div className={styles["header-child"]}>Total hours worked</div>
			</div>
			<div className={styles["staff-grid"]}>
				{staffData.map((e, i) => {
					const hourInfo = recentHours(e);
					return (
						<div className={styles["single-staff-container"]} key={e.id}>
							<Link href={"/admin/staff/" + e.id}>
								<div className={styles["staff-info"]}>{e.name}</div>
							</Link>
							<div className={styles["staff-info"]}>
								{e.days.length != 0
									? new Date(e.days[e.days.length - 1].start).toDateString()
									: "No recorded days"}
							</div>
							<div className={styles["staff-info"]}>{hourInfo.recent}</div>
							<div className={styles["staff-info"]}>{hourInfo.total}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

const recentHours = (info) => {
	let recentHours = 0;
	let totalHours = 0;

	for (let i = info.days.length - 1; i >= 0; i--) {
		const date = new Date(info.days[i].start);

		const weekLength = 604800000;
		const difference = new Date().getTime() - date.getTime();

		if (difference <= weekLength) {
			recentHours += info.days[i].duration / 60;
		}
		totalHours += info.days[i].duration / 60;
	}

	return { total: Math.ceil(totalHours), recent: Math.ceil(recentHours) };
};

const compareDates = (a, b) => {
	const aHasDate = a.days.length != 0;
	const bHasDate = b.days.length != 0;

	if (aHasDate && !bHasDate) {
		return 1;
	}
	if (!aHasDate && bHasDate) {
		return -1;
	}
	if (!aHasDate && !bHasDate) {
		return tieBreak(a, b);
	}

	const aTime = new Date(a.days[a.days.length - 1].start).getTime();
	const bTime = new Date(b.days[b.days.length - 1].start).getTime();

	if (aTime > bTime) {
		return 1;
	}
	if (aTime < bTime) {
		return -1;
	}
	return tieBreak(a, b);
};

const tieBreak = (a, b) => {
	const aDOB = new Date(a.dob).getTime();
	const bDOB = new Date(b.dob).getTime();

	if (aDOB > bDOB) {
		return 1;
	}
	if (aDOB < bDOB) {
		return -1;
	}
	return 0;
};
