import styles from "../../styles/form-page.module.css";

export default function FormBottomBox({ children = <></>, buttonText }) {
	return (
		<div className={styles["bottomBox"]}>
			<button type='submit'>{buttonText}</button>
			{children}
		</div>
	);
}
