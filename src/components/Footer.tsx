import { t } from "i18next";
import { JSX } from "react";

function Footer(): JSX.Element {
	return (
		<footer className="px-5 pb-5 md:backdrop-blur md:fixed md:p-5 md:left-0 md:bottom-0">
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
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
