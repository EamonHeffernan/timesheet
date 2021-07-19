import FormLayout from "../../components/form-layout";
import styles from "../../styles/form-page.module.css";
import Link from "next/link";
import ResetPasswordForm from "../../components/reset-password-form";

export default function ResetPassword() {
	return (
		<FormLayout pageName={"Reset Password"}>
			<h2 className={styles["no-margin"]}>
				<ResetPasswordForm />
			</h2>
			<h6 className={styles["no-margin"]}>
				<Link href='/'>
					<a>Home</a>
				</Link>
			</h6>
		</FormLayout>
	);
}
