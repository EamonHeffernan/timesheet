/*
 * @Script: day.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 06:66:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:38:17
 * @Description: Formatted Day for change request.
 */

import { getTime } from "../../pages/_app";

export default function Day({ day }) {
	return (
		<div>
			<div>Start Time: {getTime(day.start)}</div>
			<div>End Time: {getTime(day.end)}</div>
			{day.breaks.length > 0 && (
				<div>
					Breaks:
					{day.breaks.map((e, i) => (
						<div>
							Start: {getTime(e.start)} End: {getTime(e.end)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
