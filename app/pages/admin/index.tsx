import { GetServerSideProps } from "next";
import React from "react";
import useSWR from "swr";

import { fetcher, parseCookies, request } from "../_app";
import AdminLayout from "../../components/admin/admin-layout";
import StaffGrid from "../../components/admin/staff-grid";

import styles from "../../styles/staff-grid.module.css";

export default function AdminIndex({ data }) {
	const userData = useSWR("/api/admin/staff", fetcher, { initialData: data });
	const users: [any] = userData.data.data;
	return (
		<AdminLayout
			pageName='Administrator'
			className={styles["staff-grid-container"]}
		>
			<StaffGrid staffData={users} />
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// May be unsafe as host could be inserted.
	const baseURL = context.req ? context.req.headers.host : "";
	const cookie = parseCookies(context.req.cookies);

	const result = await request(
		"http://" + baseURL + "/api/admin/staff",
		"GET",
		undefined,
		{
			cookie,
		}
	);
	if (result.status !== 200) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const body = await result.json();

	return {
		props: {
			data: body,
		},
	};
};
