import ControlArea from "@/components/ControlArea";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { useAppDispatch } from "@/redux/hooks";
import { setIsFullscreen } from "@/redux/reducers/app";
import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";

function App(): JSX.Element {
	const dispatch = useAppDispatch();

	const fullscreenMarqueeRef = useRef<HTMLDivElement>(null);

	const startFullscreenMarquee = (): void => {
		dispatch(setIsFullscreen(true));
		setTimeout(() => {
			void fullscreenMarqueeRef.current?.requestFullscreen();
		}, 1);
	};

	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-217HTNLT80");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	useEffect(() => {
		const handleFullscreenChange = (): void => {
			if (!document.fullscreenElement) {
				dispatch(setIsFullscreen(false));
			}
		};

		document.addEventListener(
			"fullscreenchange",
			handleFullscreenChange,
		);

		return (): void => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange,
			);
		};
	}, [dispatch]);

	return (
		<>
			<main className="flex flex-col md:flex-row-reverse">
				<Marquee ref={fullscreenMarqueeRef} />
				<ControlArea startFullscreenMarquee={startFullscreenMarquee} />
			</main>
			<Footer />
		</>
	);
}

export default App;
