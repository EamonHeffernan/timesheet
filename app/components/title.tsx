/*
 * @Script: title.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:21:52
 * @Description: The title and image for the base layout
 */

import Image from "next/image";

import style from "../styles/title.module.css";

export default function Title() {
	return (
		<div className={style["title"]}>
			<h1>
				Riverside
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
