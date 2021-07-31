import styles from "../../styles/change-requests-layout.module.css";
export default function ChangeRequest({ info }) {
	return (
		<>
			<div className={styles["info-box"]}>{info.staff.name}</div>
			<div className={styles["info-box"]}>
				{new Date(info.newDay.start).toDateString()}
			</div>
		</>
	);
}
