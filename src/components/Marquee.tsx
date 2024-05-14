import MarqueeShell from "@/components/MarqueeShell";
import { useAppSelector } from "@/redux/hooks";
import classNames from "classnames";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

interface MarqueeProps {
	stopFullscreenMarquee: () => void;
}

function Marquee({
	stopFullscreenMarquee,
}: MarqueeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
	const foregroundColor = useAppSelector((state) => {
		return state.app.foregroundColor;
	});
	const fontSize = useAppSelector((state) => {
		return state.app.fontSize;
	});
	const isFullscreen = useAppSelector((state) => {
		return state.app.isFullscreen;
	});
	const speed = useAppSelector((state) => {
		return state.app.speed;
	});
	const text = useAppSelector((state) => {
		return state.app.text;
	});

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
		<MarqueeShell ref={ref} onClick={stopFullscreenMarquee}>
			<div className="flex items-center justify-center overflow-hidden h-full">
				<div className="w-full">
					<div
						ref={marqueeTextRef}
						className={classNames({
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
