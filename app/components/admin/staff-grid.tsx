import Link from "next/link";

import styles from "../../styles/staff-grid.module.css";

export default function StaffGrid({ staffData }) {
	return (
		<div className={styles["staff-grid-container"]}>
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
									? e.days[e.days.length - 1].start
									: "No recorded days"}
							</div>
							<div className={styles["staff-info"]}>{hourInfo.recent}</div>
							<div className={styles["staff-info"]}>{hourInfo.total}</div>
						</div>
					);
				})}
			</div>
		</div>
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
