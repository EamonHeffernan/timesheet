/*
 * @Script: index.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:15:39
 * @Description: Home page. Contains sign in form.
 */

import Link from "next/link";

import FormBottomBox from "../components/forms/form-bottom-box";
import SignInForm from "../components/forms/sign-in-form";

export default function Index() {
	return (
		<SignInForm pageName='Sign In'>
			<FormBottomBox buttonText='Sign in'>
				<h6 className='no-margin'>
					<Link href='/user/forgot-password'>
						<a>Forgot Password</a>
					</Link>
				</h6>
			</FormBottomBox>
		</SignInForm>
	);
}
