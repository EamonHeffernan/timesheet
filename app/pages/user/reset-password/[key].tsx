import Link from "next/link";
import { useRouter } from "next/router";

import FormBottomBox from "../../../components/forms/form-bottom-box";
import ResetPasswordForm from "../../../components/forms/reset-password-form";

export default function ResetPassword() {
	const router = useRouter();
	const { key } = router.query;

	if (key.length !== 72) router.push("/");

	return (
		<ResetPasswordForm pageName='Reset Password' token={key as string}>
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
