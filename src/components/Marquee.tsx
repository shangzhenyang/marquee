import MarqueeShell from "@/components/MarqueeShell";
import { useAppSelector } from "@/redux/hooks";
import classNames from "classnames";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

interface MarqueeProps {
	stopFullscreenMarquee: () => void;
}

function Marquee(
	{ stopFullscreenMarquee }: MarqueeProps,
	ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
	const foregroundColor = useAppSelector(
		(state) => state.app.foregroundColor,
	);
	const fontSize = useAppSelector((state) => state.app.fontSize);
	const isFullscreen = useAppSelector((state) => state.app.isFullscreen);
	const speed = useAppSelector((state) => state.app.speed);
	const text = useAppSelector((state) => state.app.text);
	const theme = useAppSelector((state) => state.app.theme);

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
				className={classNames({
					"bg-bisexual": theme === "bisexual",
					"bg-lesbian": theme === "lesbian",
					"bg-nonbinary": theme === "nonbinary",
					"bg-rainbow": theme === "rainbow",
					"bg-transgender": theme === "transgender",
					"flex items-center justify-center overflow-hidden h-full":
						true,
				})}
			>
				<div className="w-full">
					<div
						ref={marqueeTextRef}
						className={classNames({
							"drop-shadow": theme !== "monochrome",
							"leading-none whitespace-nowrap w-fit": true,
							"marquee": speed > 0,
							"text-center w-full": speed === 0,
						})}
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

export default forwardRef(Marquee);
