/*
 * @Script: forgot-password.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:23:08
 * @Description: Forgot password page.
 */
import Link from "next/link";
import React from "react";

import ForgotPasswordForm from "../../components/forms/forgot-password-form";
import FormBottomBox from "../../components/forms/form-bottom-box";

export default function ForgotPassword() {
	return (
		<ForgotPasswordForm pageName='Forgot Password'>
			<FormBottomBox buttonText='Submit'>
				<h6 className='no-margin'>
					<Link href='/'>
						<a>Home</a>
					</Link>
				</h6>
			</FormBottomBox>
		</ForgotPasswordForm>
	);
}
