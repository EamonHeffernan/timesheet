import Link from "next/link";

import ForgotPasswordForm from "../../components/forgot-password-form";
import FormLayout from "../../components/form-layout";
import styles from "../../styles/form-page.module.css";

export default function ForgotPassword() {
	return (
		<FormLayout pageName={"Forgot Password"}>
			<h2 className={styles["no-margin"]}>
				<ForgotPasswordForm />
			</h2>
			<h6 className={styles["no-margin"]}>
				<Link href='/'>
					<a>Home</a>
				</Link>
			</h6>
		</FormLayout>
	);
}
