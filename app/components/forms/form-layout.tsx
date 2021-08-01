/*
 * @Script: form-layout.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:20:11
 * @Description: Contains the layout for forms.
 */
import styles from "../../styles/form-page.module.css";
import BaseLayout from "../base-layout";
import Title from "../title";

export default function FormLayout({
	children,
	pageName,
	onSubmit,
	bottomBox,
}) {
	return (
		<BaseLayout pageName={pageName}>
			<div className={styles["wrapper"]}>
				<Title />
				<br />
				<main className={styles["form-box"]}>
					<h1 className={`${styles["center-text"]} ${styles["title"]}`}>
						{pageName}
					</h1>
					<div className={styles["input-container"]}>
						<form onSubmit={onSubmit}>
							{children}
							{bottomBox}
						</form>
					</div>
				</main>
			</div>
		</BaseLayout>
	);
}
