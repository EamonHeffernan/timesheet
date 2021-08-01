/*
 * @Script: change-request.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 01:46:36
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:32:28
 * @Description: Formats info from change request
 */
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
