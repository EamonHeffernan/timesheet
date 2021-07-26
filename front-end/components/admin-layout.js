import styles from "./admin-layout.module.css";
import BaseLayout from "./base-layout";
import Link from "next/link";
import ClearCookies from "./log-out";

export default function AdminLayout({ children, pageName }) {
	return (
		<BaseLayout
			pageName={pageName}
			mainContainerStyle={styles["main-container"]}
			backgroundStyle={styles["background"]}
		>
			<div className={styles["header"]}>
				<Link href='/admin/'>
					<a className={styles["header-items"]}>Home</a>
				</Link>
				<p className={styles["header-items"]}>Timesheet</p>
				<Link href='/'>
					<a className={styles["header-items"]} onClick={ClearCookies}>
						Log out
					</a>
				</Link>
			</div>
			<main>{children}</main>
		</BaseLayout>
	);
}
