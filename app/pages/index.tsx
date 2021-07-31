import Link from "next/link";

import FormLayout from "../components/form-layout";
import SignInForm from "../components/sign-in-form";
import styles from "../styles/form-page.module.css";

export default function Index() {
	return (
		<FormLayout pageName='Sign In'>
			<h2 className={styles["no-margin"]}>
				<SignInForm />
			</h2>
			<h6 className={styles["no-margin"]}>
				<Link href='/user/forgot-password'>
					<a>Forgot Password</a>
				</Link>
			</h6>
		</FormLayout>
	);
}
