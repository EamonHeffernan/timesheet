import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";

export default function StaffIndex({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <>{data}</>;
}

export const getServerSideProps: GetServerSideProps = async () => {
	const result = await fetch("/api/staff/");
	const json = await result.json();
	return { props: { data: json } };
};
