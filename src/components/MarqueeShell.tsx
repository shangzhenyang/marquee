import { useAppSelector } from "@/redux/hooks";
import { handleKeyboardClick } from "@/utils";
import { Card } from "@nextui-org/react";
import classNames from "classnames";
import { JSX, ReactNode, RefObject } from "react";

interface MarqueeShellProps {
	children: ReactNode;
	onClick: () => void;
	ref: RefObject<HTMLDivElement | null>;
}

function MarqueeShell({
	children,
	onClick,
	ref,
}: MarqueeShellProps): JSX.Element {
	const backgroundColor = useAppSelector(
		(state) => state.app.backgroundColor,
	);
	const isFullscreen = useAppSelector((state) => state.app.isFullscreen);
	const themes = useAppSelector((state) => state.app.themes);
	const theme = themes[0];

	if (isFullscreen) {
		return (
			<div
				ref={ref}
				className="fixed left-0 top-0 h-full w-full cursor-default select-none z-10"
				role="button"
				style={{
					backgroundColor: backgroundColor,
				}}
				tabIndex={0}
				onClick={onClick}
				onKeyDown={handleKeyboardClick(onClick)}
			>
				{children}
			</div>
		);
	}

	return (
		<Card
			ref={ref}
			className={classNames({
				"h-[175px] w-100 md:h-[400px] md:w-[400px] dark:border-1 dark:border-neutral-800":
					true,
				"text-black": theme === "lesbian" || theme === "transgender",
				"text-white": theme === "bisexual" || theme === "rainbow",
			})}
		>
			{children}
		</Card>
	);
}

export default MarqueeShell;
