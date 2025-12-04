import { signal } from "@preact/signals";

const params = Object.fromEntries(
	new URLSearchParams(window.location.search).entries(),
) as {
	bg?: string;
	fg?: string;
	text?: string;
	theme?: string;
};

export const backgroundColor = signal(`#${params.bg || "000000"}`);
export const fontSize = signal(window.innerWidth < 768 ? 96 : 128);
export const foregroundColor = signal(`#${params.fg || "ffffff"}`);
export const isFullscreen = signal(false);
export const speed = signal(2);
export const text = signal(params.text || "Hello, World!");
export const themes = signal([params.theme || "monochrome"]);
