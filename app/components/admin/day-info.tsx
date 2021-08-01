/*
 * @Script: day-info.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-31 08:06:02
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:28:26
 * @Description: Formats day data for use in admin view.
 */

import Link from "next/link";

export default function DayInfo({ staffInfo }) {
	return (
		<>
			<td>
				<Link href={"/admin/staff/" + staffInfo.id}>
					<a>
						{staffInfo.name.length > 7
							? staffInfo.name.slice(0, 8) + "..."
							: staffInfo.name}
					</a>
				</Link>
			</td>
			<td>
				{staffInfo.days.length != 0
					? staffInfo.days[staffInfo.days.length - 1].start.slice(0, 10)
					: "No recorded dates"}
			</td>
		</>
	);
}
