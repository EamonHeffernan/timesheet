import Link from "next/link";

import styles from "../../styles/admin-layout.module.css";
import BaseLayout from "../base-layout";
import ClearCookies from "../log-out";

export default function AdminLayout({
	children,
	pageName,
	className = styles["main-container"],
}) {
	return (
		<BaseLayout pageName={pageName} backgroundImage={false}>
			<div className={styles["background"]}>
				<div className={styles["header"]}>
					<Link href='/admin'>
						<a className={styles["header-items"]}>Home</a>
					</Link>
					<p className={styles["header-items"]}>Timesheet</p>
					<Link href='/'>
						<a className={styles["header-items"]} onClick={ClearCookies}>
							Log out
						</a>
					</Link>
				</div>
				<div className={className}>{children}</div>
			</div>
		</BaseLayout>
	);
}
