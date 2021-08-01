/*
 * @Script: [id].tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 06:55:55
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:35:15
 * @Description: Page to view a single change request
 */

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../../../styles/change-requests-layout.module.css";
import useSWR from "swr";

import { fetcher, parseCookies, request } from "../../_app";
import AdminLayout from "../../../components/admin/admin-layout";
import React, { useState } from "react";
import Day from "../../../components/admin/day";

export default function StaffView({ data }) {
	const router = useRouter();
	const { id } = router.query;

	const requestData = useSWR("/api/admin/pendingChangeRequests/", fetcher, {
		initialData: data,
	});

	const req = requestData.data.data.find((e) => e._id == id);

	const resolveRequest = async (accept: boolean) => {
		try {
			const res = await request("/api/admin/resolveChangeRequest", "POST", {
				id,
				acceptRequest: accept,
			});

			const result = await res.json();

			alert(result.message);

			router.push("/admin/change-requests");
		} catch (err) {
			console.error(err);
			alert("Unknown error occurred");
		}
	};

	return (
		<AdminLayout pageName='Staff View' className={styles["base-container"]}>
			<div className={styles["title"]}>Pending Change Requests</div>
			{req !== undefined && (
				<>
					<div className={styles["change-info"]}>
						{req.staff.name +
							" has requested to change the times they entered on " +
							new Date(req.newDay.start).toDateString() +
							"."}
					</div>
					<div>Date: {new Date(req.newDay.start).toDateString()}</div>
					<div className={styles["day-container"]}>
						<Day day={req.oldDay} />
						<Day day={req.newDay} />
					</div>
					<div className={styles["button-container"]}>
						<div
							className={styles["button-accept"]}
							onClick={() => resolveRequest(true)}
						>
							Accept
						</div>
						<div
							className={styles["button-deny"]}
							onClick={() => resolveRequest(false)}
						>
							Deny
						</div>
					</div>
				</>
			)}
		</AdminLayout>
	);
}
export const getServerSideProps: GetServerSideProps = async (context) => {
	// May be unsafe as host could be inserted.
	const baseURL = context.req ? context.req.headers.host : "";
	const cookie = parseCookies(context.req.cookies);

	const result = await request(
		"http://" + baseURL + "/api/admin/pendingChangeRequests/",
		"GET",
		undefined,
		{
			cookie,
		}
	);
	if (result.status !== 200) {
		console.log(result.status);
		return {
			redirect: {
				destination: "/admin",
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
