/*
 * @Script: submit.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-27 01:20:35
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:27:32
 * @Description: Page for staff submitting times.
 */

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

/**
 * Request sign out endpoint
 */
const signOut = () => {
	request("/api/users/signOut", "POST");
};
