import { backgroundColor, isFullscreen, themes } from "@/signals";
import { handleKeyboardClick } from "@/utils";
import { Card } from "@heroui/react";
import clsx from "clsx";
import { forwardRef, JSX, ReactNode, Ref } from "react";

interface MarqueeShellProps {
	children: ReactNode;
	onClick: () => void;
}

function MarqueeShell(
	{ children, onClick }: MarqueeShellProps,
	ref: Ref<HTMLDivElement>,
): JSX.Element {
	const theme = themes.value[0];

	if (isFullscreen.value) {
		return (
			<div
				ref={ref}
				className="fixed left-0 top-0 h-full w-full cursor-default select-none z-10"
				role="button"
				style={{ backgroundColor: backgroundColor.value }}
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
			className={clsx(
				"h-[175px] w-full md:h-[400px] md:w-[400px] dark:border-1 dark:border-neutral-800",
				(theme === "lesbian" || theme === "transgender") &&
					"text-black",
				(theme === "bisexual" || theme === "rainbow") && "text-white",
			)}
		>
			{children}
		</Card>
	);
}

export default forwardRef(MarqueeShell);
