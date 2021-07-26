import styles from "../styles/form-page.module.css";
import BaseLayout from "./base-layout";
import Title from "./title";

export default function FormLayout({ children, pageName }) {
	return (
		<BaseLayout pageName={pageName}>
			<Title />
			<br />
			<main className={styles["form-box"]}>
				<h1 className={`${styles["center-text"]} ${styles["title"]}`}>
					{pageName}
				</h1>
				{children}
			</main>
		</BaseLayout>
	);
}
