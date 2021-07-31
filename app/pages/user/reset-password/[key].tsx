import Link from "next/link";

import FormBottomBox from "../../../components/forms/form-bottom-box";
import FormLayout from "../../../components/forms/form-layout";
import ResetPasswordForm from "../../../components/forms/reset-password-form";
import styles from "../../styles/form-page.module.css";

export default function ResetPassword() {
	return (
		<ResetPasswordForm pageName='Reset Password'>
			<FormBottomBox buttonText='Reset'>
				<h6 className='no-margin'>
					<Link href='/'>
						<a>Home</a>
					</Link>
				</h6>
			</FormBottomBox>
		</ResetPasswordForm>
	);
}
