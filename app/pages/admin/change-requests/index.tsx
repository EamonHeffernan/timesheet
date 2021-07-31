import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/admin-layout";
import ChangeRequest from "../../../components/admin/change-request";
import styles from "../../../styles/change-requests-layout.module.css";
import { fetcher, parseCookies, request } from "../../_app";

export default function ChangeRequests({ data }) {
	const info = useSWR("/api/admin/pendingChangeRequests", fetcher, {
		initialData: data,
	});

	const changeRequests = info.data.data;
	changeRequests.reverse();

	return (
		<AdminLayout
			pageName='Change Requests'
			className={styles["base-container"]}
		>
			<div className={styles["title"]}>Pending Change Requests</div>
			<div className={styles["grid-container"]}>
				{changeRequests.map((e, i) => (
					<Link href={"/admin/change-requests/" + e._id}>
						<div className={styles["grid-item"]}>
							<ChangeRequest info={e} />
						</div>
					</Link>
				))}
			</div>
		</AdminLayout>
	);
}
export const getServerSideProps: GetServerSideProps = async (context) => {
	// May be unsafe as host could be inserted.
	const baseURL = context.req ? context.req.headers.host : "";
	const cookie = parseCookies(context.req.cookies);

	const result = await request(
		"http://" + baseURL + "/api/admin/pendingChangeRequests",
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
