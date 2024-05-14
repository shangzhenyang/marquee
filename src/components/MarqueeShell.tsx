import { useAppSelector } from "@/redux/hooks";
import { handleKeyboardClick } from "@/utils";
import { Card } from "@nextui-org/react";
import { ForwardedRef, ReactNode, forwardRef } from "react";

interface MarqueeShellProps {
	children: ReactNode;
	onClick: () => void;
}

function MarqueeShell({
	children,
	onClick,
}: MarqueeShellProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
	const backgroundColor = useAppSelector((state) => {
		return state.app.backgroundColor;
	});
	const isFullscreen = useAppSelector((state) => {
		return state.app.isFullscreen;
	});

	if (isFullscreen) {
		return (
			<div
				ref={ref}
				className={"fixed left-0 top-0 h-screen w-screen cursor-default select-none z-10"}
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
		<Card ref={ref} className={"h-[175px] w-100 md:h-[400px] md:w-[400px]"}>
			{children}
		</Card>
	);
}

export default forwardRef(MarqueeShell);
