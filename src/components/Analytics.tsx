import { JSX, useEffect } from "react";
import ReactGA from "react-ga4";

function Analytics(): JSX.Element {
	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-217HTNLT80");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	return <></>;
}

export default Analytics;
