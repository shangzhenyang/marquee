import { create } from "zustand";

interface StoreStateInfo {
	backgroundColor: string;
	fontSize: number;
	foregroundColor: string;
	isFullscreen: boolean;
	speed: number;
	text: string;
	theme: string;
}

const params = Object.fromEntries(
	new URLSearchParams(window.location.search).entries(),
) as {
	bg?: string;
	fg?: string;
	text?: string;
	theme?: string;
};

export const useStore = create<StoreStateInfo>()(() => {
	return {
		backgroundColor: `#${params.bg || "000000"}`,
		fontSize: window.innerWidth < 768 ? 96 : 128,
		foregroundColor: `#${params.fg || "ffffff"}`,
		isFullscreen: false,
		speed: 2,
		text: params.text || "Hello, World!",
		theme: params.theme || "monochrome",
	};
});
