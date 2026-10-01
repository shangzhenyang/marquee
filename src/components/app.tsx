import Analytics from "@/components/analytics";
import ControlArea from "@/components/control-area";
import Footer from "@/components/footer";
import Marquee from "@/components/marquee";
import { useStore } from "@/store";
import { sleep } from "@/utils";
import { useTheme } from "@heroui/react";
import type { JSX } from "react";
import { useCallback, useEffect, useRef } from "react";

function App(): JSX.Element {
	useTheme();
	const fullscreenMarqueeRef = useRef<HTMLDivElement>(null);

	const startFullscreenMarquee = useCallback(async (): Promise<void> => {
		useStore.setState({
			isFullscreen: true,
		});
		await sleep(1);
		const element = fullscreenMarqueeRef.current;
		if (!element) {
			return;
		}
		if (element.requestFullscreen) {
			await element.requestFullscreen();
		} else if ("webkitRequestFullscreen" in element) {
			await (
				element.webkitRequestFullscreen as typeof element.requestFullscreen
			)();
		}
	}, []);

	const stopFullscreenMarquee = useCallback((): void => {
		useStore.setState({
			isFullscreen: false,
		});
		if (document.exitFullscreen) {
			void document.exitFullscreen();
		} else if ("webkitExitFullscreen" in document) {
			void (
				document.webkitExitFullscreen as typeof document.exitFullscreen
			)();
		}
	}, []);

	useEffect(() => {
		const handleFullscreenChange = (): void => {
			if (!document.fullscreenElement) {
				useStore.setState({
					isFullscreen: false,
				});
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
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape" && useStore.getState().isFullscreen) {
				stopFullscreenMarquee();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [stopFullscreenMarquee]);

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
