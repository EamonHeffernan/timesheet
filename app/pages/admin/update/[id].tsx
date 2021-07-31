import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/admin-layout";
import styles from "../../../styles/add-staff.layout.module.css";
import { fetcher, parseCookies, parseDateString, request } from "../../_app";

export default function UpdateStaff({ data }) {
	const router = useRouter();
	const { id } = router.query;

	const userData = useSWR("/api/admin/staff/" + id, fetcher, {
		initialData: data,
	});

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");

	const updateUser = async (event) => {
		event.preventDefault();

		const result = await request("/api/admin/staff/" + id, "PUT", {
			email,
			name,
			dob: parseDateString(dob),
		});

		const res = await result.json();
		alert(res.message);
		router.push("/admin");
	};

	return (
		<AdminLayout
			pageName={"Update " + userData.data.data.name}
			className={styles["base-container"]}
		>
			{userData.data.data !== undefined && (
				<>
					<div className={styles["title"]}>
						{"Update " + userData.data.data.name}
					</div>
					<form className={styles["form-container"]} onSubmit={updateUser}>
						<div className={styles["input-container"]}>
							<label>Email: </label>
							<input
								onInput={(e) => setEmail(e.currentTarget.value)}
								type='email'
								autoComplete='email'
								required
							/>
						</div>
						<div className={styles["input-container"]}>
							<label>Name: </label>
							<input
								onInput={(e) => setName(e.currentTarget.value)}
								autoComplete='name'
								required
							/>
						</div>
						<div className={styles["input-container"]}>
							<label>Date of Birth: </label>
							<input
								onInput={(e) => setDob(e.currentTarget.value)}
								type='date'
								required
							/>
						</div>
						<div className={styles["submit-button"]}>
							<button type='submit'>Update Staff Member</button>
						</div>
					</form>
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
