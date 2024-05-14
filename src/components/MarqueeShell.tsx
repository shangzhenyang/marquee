import { useAppSelector } from "@/redux/hooks";
import { Card } from "@nextui-org/react";
import { ForwardedRef, ReactNode, forwardRef } from "react";

interface MarqueeShellProps {
	children: ReactNode;
	className: string;
}

function MarqueeShell({
	children,
	className,
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
				className={className}
				style={{
					backgroundColor: backgroundColor,
				}}
			>
				{children}
			</div>
		);
	}

	return (
		<Card ref={ref} className={className + " h-[225px] w-100 md:h-[400px] md:w-[400px]"}>
			{children}
		</Card>
	);
}

export default forwardRef(MarqueeShell);
