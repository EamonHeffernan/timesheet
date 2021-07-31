import Link from "next/link";

export default function StaffInfo({ staffInfo }) {
	return (
		<>
			<div>
				<Link href={"/admin/staff/" + staffInfo.id}>
					<a>
						{staffInfo.name.length > 7
							? staffInfo.name.slice(0, 8) + "..."
							: staffInfo.name}
					</a>
				</Link>
			</div>
			<div>
				{staffInfo.days.length != 0
					? staffInfo.days[staffInfo.days.length - 1].start.slice(0, 10)
					: "No recorded dates"}
			</div>
			<div>{recentHours(staffInfo)}</div>
		</>
	);
}

const recentHours = (info): number => {
	let recentHours = 0;

	for (let i = info.days.length - 1; i >= 0; i--) {
		console.log(info.days[i].start);
		const date = new Date(info.days[i].start);

		const weekLength = 604800000;
		const difference = new Date().getTime() - date.getTime();

		if (difference <= weekLength) {
			recentHours += info.days[i].duration / 60;
		} else {
			return Math.floor(recentHours);
		}
	}

	return Math.floor(recentHours);
};
