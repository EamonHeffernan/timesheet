import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

import { fetcher, request } from "../_app";
import DateForm from "../../components/staff/date-form";
import FormLayout from "../../components/form-layout";
import styles from "../../styles/form-page.module.css";

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
			<h2 className={styles["no-margin"]}>
				<DateForm />
			</h2>
			<h6 className={styles["no-margin"]}>
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
