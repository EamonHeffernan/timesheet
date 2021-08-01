/*
 * @Script: form-bottom-box.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 12:05:59
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:31:19
 * @Description: Contains submit button for forms.
 */

import styles from "../../styles/form-page.module.css";

export default function FormBottomBox({ children = <></>, buttonText }) {
	return (
		<div className={styles["bottomBox"]}>
			<button type='submit'>{buttonText}</button>
			{children}
		</div>
	);
}
