import Link from "next/link";
import styles from "../styles/form-page.module.css";
import SignInForm from "../components/sign-in-form";
import FormLayout from "../components/form-layout";

export default function Index() {
	return (
		<FormLayout pageName='Sign In'>
			<h2 className={styles["no-margin"]}>
				<SignInForm />
			</h2>
			<h6 className={styles["no-margin"]}>
				<Link href='/user/forgot-password'>
					<a>Forgot password</a>
				</Link>
			</h6>
		</FormLayout>
	);
}
