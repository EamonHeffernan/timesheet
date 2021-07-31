import { GetServerSideProps } from "next";
import useSWR from "swr";
import { fetcher, parseCookies, request } from "../_app";

export default function ChangeRequests({ data }) {
	const changeRequests = useSWR("/api/admin/pendingChangeRequests", fetcher, {
		initialData: data,
	});
	console.log(changeRequests.data.data[0]);
	return <>{changeRequests.data.data[0].id}</>;
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
