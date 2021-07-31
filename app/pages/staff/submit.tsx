import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

import { fetcher, request } from "../_app";
import DateForm from "../../components/staff/date-form";
import FormBottomBox from "../../components/forms/form-bottom-box";

export default function StaffSubmit() {
	const { data, error } = useSWR("/api/staff", fetcher);
	const router = useRouter();

	if (data && data.statusCode !== 200) {
		router.push("/");
	}
	return (
		<DateForm
			pageName={data && data.statusCode === 200 ? `Hi ${data.data.name}!` : ""}
		>
			<FormBottomBox buttonText='Submit'>
				<h6 className='no-margin'>
					<Link href='/'>
						<a onClick={signOut}>Sign out</a>
					</Link>
				</h6>
			</FormBottomBox>
		</DateForm>
	);
}

const signOut = () => {
	request("/api/users/signOut", "POST");
};
