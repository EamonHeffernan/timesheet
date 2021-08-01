/*
 * @Script: [key].tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:23:21
 * @Description: Reset password page. Uses variable [key].
 */
import Link from "next/link";
import { useRouter } from "next/router";

import FormBottomBox from "../../../components/forms/form-bottom-box";
import ResetPasswordForm from "../../../components/forms/reset-password-form";

export default function ResetPassword() {
	const router = useRouter();
	const { key } = router.query;

	//if (!key || key.length !== 72) router.push("/");

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
