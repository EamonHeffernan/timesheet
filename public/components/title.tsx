import Image from "next/image";
import style from "../styles/title.module.css";

export default function Title() {
	return (
		<div className={style["title"]}>
			<h1>
				Riverside{" "}
				<Image
					src='/images/logo.png'
					width={165}
					height={185}
					layout='intrinsic'
				/>
				Grammar
				<br />
				Digital Time Sheet
			</h1>
		</div>
	);
}
