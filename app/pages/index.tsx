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
