import styles from "../../../styles/change-requests-layout.module.css";
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
