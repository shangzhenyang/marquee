import MarqueeShell from "@/components/marquee-shell";
import { useStore } from "@/store";
import clsx from "clsx";
import type { JSX, Ref } from "react";
import { useLayoutEffect, useRef, useState } from "react";

interface MarqueeProps {
	ref: Ref<HTMLDivElement>;
	stopFullscreenMarquee: () => void;
}

function Marquee({ ref, stopFullscreenMarquee }: MarqueeProps): JSX.Element {
	const fontSize = useStore((state) => state.fontSize);
	const foregroundColor = useStore((state) => state.foregroundColor);
	const isFullscreen = useStore((state) => state.isFullscreen);
	const speed = useStore((state) => state.speed);
	const text = useStore((state) => state.text);
	const theme = useStore((state) => state.theme);

	const [duration, setDuration] = useState<number>(0);

	const marqueeTextRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const textWidth = marqueeTextRef.current?.offsetWidth ?? 0;
		const viewportWidth = isFullscreen ? window.innerWidth : 400;
		const totalDistance = viewportWidth + textWidth;
		setDuration(totalDistance / (speed * 100));
	}, [fontSize, isFullscreen, speed, text]);

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
