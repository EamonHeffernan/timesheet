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
