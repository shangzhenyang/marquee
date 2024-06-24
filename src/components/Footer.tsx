import { t } from "i18next";

function Footer(): JSX.Element {
	return (
		<footer className="backdrop-blur fixed p-5 left-0 bottom-0">
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.yangshangzhen.com/">{t("shangzhenYang")}</a>
			<span className="text-slate-500"> | </span>
			<a
				className="underline"
				href="https://github.com/shangzhenyang/marquee"
			>
				GitHub
			</a>
		</footer>
	);
}

export default Footer;
