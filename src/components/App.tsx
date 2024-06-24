import Analytics from "@/components/Analytics";
import ControlArea from "@/components/ControlArea";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { useAppDispatch } from "@/redux/hooks";
import { setIsFullscreen } from "@/redux/reducers/app";
import { useEffect, useRef } from "react";

function App(): JSX.Element {
	const dispatch = useAppDispatch();

	const fullscreenMarqueeRef = useRef<HTMLDivElement>(null);

	const startFullscreenMarquee = (): void => {
		dispatch(setIsFullscreen(true));
		setTimeout(() => {
			const element = fullscreenMarqueeRef.current;
			if (!element) {
				return;
			}
			if (element.requestFullscreen) {
				void element.requestFullscreen();
			} else if ("webkitRequestFullscreen" in element) {
				void (
					element.webkitRequestFullscreen as typeof element.requestFullscreen
				)();
			}
		}, 1);
	};

	const stopFullscreenMarquee = (): void => {
		dispatch(setIsFullscreen(false));
		if (document.exitFullscreen) {
			void document.exitFullscreen();
		} else if ("webkitExitFullscreen" in document) {
			void (
				document.webkitExitFullscreen as typeof document.exitFullscreen
			)();
		}
	};

	useEffect(() => {
		const handleFullscreenChange = (): void => {
			if (!document.fullscreenElement) {
				dispatch(setIsFullscreen(false));
			}
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener(
			"webkitfullscreenchange",
			handleFullscreenChange,
		);

		return (): void => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange,
			);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange,
			);
		};
	}, [dispatch]);

	return (
		<>
			<main className="flex flex-col-reverse md:flex-row justify-evenly gap-7 p-5 w-full">
				<ControlArea startFullscreenMarquee={startFullscreenMarquee} />
				<Marquee
					ref={fullscreenMarqueeRef}
					stopFullscreenMarquee={stopFullscreenMarquee}
				/>
			</main>
			<Footer />
			<Analytics />
		</>
	);
}

export default App;
