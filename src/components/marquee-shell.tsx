import { useStore } from "@/store";
import { handleKeyboardClick } from "@/utils";
import { Card } from "@heroui/react";
import clsx from "clsx";
import type { JSX, ReactNode, Ref } from "react";

interface MarqueeShellProps {
	children: ReactNode;
	onClick: () => void;
	ref: Ref<HTMLDivElement>;
}

function MarqueeShell({
	children,
	onClick,
	ref,
}: MarqueeShellProps): JSX.Element {
	const backgroundColor = useStore((state) => state.backgroundColor);
	const isFullscreen = useStore((state) => state.isFullscreen);
	const theme = useStore((state) => state.theme);

	if (isFullscreen) {
		return (
			<div
				ref={ref}
				className="fixed left-0 top-0 h-full w-full cursor-default select-none z-10"
				role="button"
				style={{
					backgroundColor,
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
			className={clsx(
				"h-[175px] w-full overflow-hidden p-0 md:h-[400px] md:w-[400px] dark:border dark:border-neutral-800",
				(theme === "lesbian" || theme === "transgender") &&
					"text-black",
				(theme === "bisexual" || theme === "rainbow") && "text-white",
			)}
		>
			{children}
		</Card>
	);
}

export default MarqueeShell;
