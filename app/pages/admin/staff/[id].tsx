import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { fetcher, parseCookies, request } from "../../_app";
import AdminLayout from "../../../components/admin/admin-layout";

export default function StaffView({ data }) {
	const router = useRouter();
	const { id } = router.query;

	const userData = useSWR("/api/admin/staff/" + id, fetcher, {
		initialData: data,
	});

	const user = userData.data.data;

	return <AdminLayout pageName='Staff View'>{user.name}</AdminLayout>;
}
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
