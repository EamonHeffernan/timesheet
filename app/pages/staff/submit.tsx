import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

import { fetcher, request } from "../_app";
import FormLayout from "../../components/forms/form-layout";
import DateForm from "../../components/staff/date-form";

export default function StaffSubmit() {
	const { data, error } = useSWR("/api/staff", fetcher);
	const router = useRouter();

	if (data && data.statusCode !== 200) {
		router.push("/");
	}
	return (
		<FormLayout
			pageName={data && data.statusCode === 200 ? `Hi ${data.data.name}!` : ""}
		>
			<h2 className='no-margin'>
				<DateForm />
			</h2>
			<h6 className='no-margin'>
				<Link href='/'>
					<a onClick={signOut}>Sign out</a>
				</Link>
			</h6>
		</FormLayout>
	);
}

const signOut = () => {
	request("/api/users/signOut", "POST");
};
