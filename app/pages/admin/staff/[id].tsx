/*
 * @Script: [id].tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-31 08:06:02
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:30:01
 * @Description: Admin view of single user.
 */

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { fetcher, parseCookies, request } from "../../_app";
import AdminLayout from "../../../components/admin/admin-layout";
import DayGrid from "../../../components/admin/day-grid";
import styles from "../../../styles/staff.module.css";

export default function StaffView({ data }) {
	const router = useRouter();
	const { id } = router.query;

	const userData = useSWR("/api/admin/staff/" + id, fetcher, {
		initialData: data,
	});

	const user = userData.data.data;
	const hourInfo = recentHours(user);

	return (
		<AdminLayout pageName='Staff View' className={styles["container"]}>
			<DayGrid staffData={user} />
			<div className={styles["sidebar"]}>
				<div className={styles["sidebar-item"]}>Name: {user.name}</div>
				<div className={styles["sidebar-item"]}>
					Recent Hours: {hourInfo.recent}
				</div>
				<div className={styles["sidebar-item"]}>
					Total Hours: {hourInfo.total}
				</div>
			</div>
		</AdminLayout>
	);
}

/**
 * Get hours user has worked in the last 7 days
 * @param info User to get recent hours of.
 * @returns Hours worked in the last 7 days
 */
const recentHours = (info) => {
	let recentHours = 0;
	let totalHours = 0;

	for (let i = info.days.length - 1; i >= 0; i--) {
		const date = new Date(info.days[i].start);

		const weekLength = 604800000;
		const difference = new Date().getTime() - date.getTime();

		if (difference <= weekLength) {
			recentHours += info.days[i].duration / 60;
		}
		totalHours += info.days[i].duration / 60;
	}

	return { total: Math.ceil(totalHours), recent: Math.ceil(recentHours) };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	// May be unsafe as host could be inserted.
	const baseURL = context.req ? context.req.headers.host : "";
	const cookie = parseCookies(context.req.cookies);

	const result = await request(
		"http://" + baseURL + "/api/admin/staff/" + context.params.id,
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
