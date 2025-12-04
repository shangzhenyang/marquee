import MarqueeShell from "@/components/marquee-shell";
import {
	fontSize,
	foregroundColor,
	isFullscreen,
	speed,
	text,
	themes,
} from "@/signals";
import { useSignalEffect } from "@preact/signals";
import clsx from "clsx";
import { forwardRef, JSX, Ref, useRef, useState } from "react";

interface MarqueeProps {
	stopFullscreenMarquee: () => void;
}

function Marquee(
	{ stopFullscreenMarquee }: MarqueeProps,
	ref: Ref<HTMLDivElement>,
): JSX.Element {
	const theme = themes.value[0];

	const [duration, setDuration] = useState<number>(0);

	const marqueeTextRef = useRef<HTMLDivElement>(null);

	useSignalEffect(() => {
		const textWidth = marqueeTextRef.current?.offsetWidth ?? 0;
		const viewportWidth = isFullscreen.value ? window.innerWidth : 400;
		const totalDistance = viewportWidth + textWidth;
		const newDuration = totalDistance / (speed.value * 100);
		setDuration(newDuration);
	});

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
							speed.value > 0 && "marquee",
							speed.value === 0 && "text-center w-full",
						)}
						style={{
							animationDuration: `${duration}s`,
							color: isFullscreen.value
								? foregroundColor.value
								: undefined,
							fontSize: `${fontSize.value}px`,
						}}
					>
						{text.value}
					</div>
				</div>
			</div>
		</MarqueeShell>
	);
}

export default forwardRef(Marquee);
