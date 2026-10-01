import type { KeyboardEvent as ReactKeyboardEvent } from "react";

export function handleKeyboardClick(
	onClick: () => void,
): (event: KeyboardEvent | ReactKeyboardEvent<Element>) => void {
	return (event: KeyboardEvent | ReactKeyboardEvent<Element>): void => {
		switch (event.key) {
			case "Enter":
			case " ": {
				onClick();
				event.preventDefault();
				break;
			}
			default: {
				break;
			}
		}
	};
}

export function sleep(delay: number): Promise<void> {
	return new Promise((resolve) => {
		window.setTimeout(resolve, delay);
	});
}
