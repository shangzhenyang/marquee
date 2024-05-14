import { t } from "i18next";

function Footer(): JSX.Element {
	return (
		<footer className="backdrop-blur fixed p-5 left-0 bottom-0">
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
		</footer>
	);
}

export default Footer;
