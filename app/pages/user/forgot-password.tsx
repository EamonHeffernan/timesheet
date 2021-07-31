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
