import styles from "../../../styles/change-requests-layout.module.css";

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

const getTime = (input) => {
	const date = new Date(input);
	let hours = date.getUTCHours();
	let pm = false;
	if (hours > 12) {
		hours -= 12;
		pm = true;
	}

	return `${hours}:${(date.getUTCMinutes() + "").padStart(2, "0")}${
		!pm ? "am" : "pm"
	}`;
};
