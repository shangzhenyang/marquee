import MarqueeShell from "@/components/MarqueeShell";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { JSX, RefObject, useEffect, useRef, useState } from "react";

interface MarqueeProps {
	ref: RefObject<HTMLDivElement | null>;
	stopFullscreenMarquee: () => void;
}

function Marquee({ ref, stopFullscreenMarquee }: MarqueeProps): JSX.Element {
	const foregroundColor = useAppSelector(
		(state) => state.app.foregroundColor,
	);
	const fontSize = useAppSelector((state) => state.app.fontSize);
	const isFullscreen = useAppSelector((state) => state.app.isFullscreen);
	const speed = useAppSelector((state) => state.app.speed);
	const text = useAppSelector((state) => state.app.text);
	const themes = useAppSelector((state) => state.app.themes);
	const theme = themes[0];

	const [duration, setDuration] = useState<number>(0);

	const marqueeTextRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const textWidth = marqueeTextRef.current?.offsetWidth ?? 0;
		const viewportWidth = isFullscreen ? window.innerWidth : 400;
		const totalDistance = viewportWidth + textWidth;
		const newDuration = totalDistance / (speed * 100);
		setDuration(newDuration);
	}, [isFullscreen, marqueeTextRef, speed, text]);

	return (
		<MarqueeShell
			ref={ref}
			onClick={stopFullscreenMarquee}
		>
			<div
				className={clsx(
					theme === "bisexual" && "bg-bisexual",
					theme === "lesbian" && "bg-lesbian",
					theme === "nonbinary" && "bg-nonbinary",
					theme === "rainbow" && "bg-rainbow",
					theme === "transgender" && "bg-transgender",
					"flex items-center justify-center overflow-hidden h-full",
				)}
			>
				<div className="w-full">
					<div
						ref={marqueeTextRef}
						className={clsx(
							"leading-none whitespace-nowrap w-fit",
							theme !== "monochrome" && "drop-shadow",
							speed > 0 && "marquee",
							speed === 0 && "text-center w-full",
						)}
						style={{
							animationDuration: `${duration}s`,
							color: isFullscreen ? foregroundColor : undefined,
							fontSize: `${fontSize}px`,
						}}
					>
						{text}
					</div>
				</div>
			</div>
		</MarqueeShell>
	);
}

export default Marquee;
