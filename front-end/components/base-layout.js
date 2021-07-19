import Head from "next/head";
import styles from "./base-layout.module.css";

export const siteTitle = "Next.js Sample Website";

export default function BaseLayout({ children, pageName }) {
	return (
		<div className={styles["background"]}>
			<Head>
				<title>{pageName}</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='learn how to build a website with next.js'
				/>
				<meta
					property='og:image'
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>
			<div className={styles["main-container"]}>{children}</div>
		</div>
	);
}
