/*
 * @Script: base-layout.tsx
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-07-19 17:52:54
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 14:19:47
 * @Description: Contains the layout most of the site uses.
 */

import Head from "next/head";
import Image from "next/image";

import styles from "../styles/base-layout.module.css";

export const siteTitle = "Next.js Sample Website";

export default function BaseLayout({
	children,
	pageName,
	backgroundImage = true,
}) {
	return (
		<div className={styles["background"]}>
			<Head>
				<title>{"RSG Timesheet: " + pageName}</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='Riverside Grammar School Timesheet' />
				<meta
					property='og:image'
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>
			{backgroundImage && (
				<div className={styles["background-image"]}>
					<Image
						src='/images/background.jpg'
						layout='fill'
						objectFit='cover'
						quality={100}
					/>
				</div>
			)}
			<div className={styles["main-container"]}>{children}</div>
		</div>
	);
}
