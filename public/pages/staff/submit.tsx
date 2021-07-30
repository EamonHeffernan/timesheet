import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/form-page.module.css";
import FormLayout from "../../components/form-layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import DateForm from "../../components/date-form";
import { request } from "../_app";

const fetcher = (url) => fetch(url).then((res) => res.json());

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
