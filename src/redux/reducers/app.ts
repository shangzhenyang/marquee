import { createSlice } from "@reduxjs/toolkit";

const params = Object.fromEntries(
	new URLSearchParams(window.location.search).entries(),
) as Record<string, string | undefined>;

const initialState = {
	backgroundColor: "#" + (params.bg || "000000"),
	fontSize: window.innerWidth < 768 ? 96 : 128,
	foregroundColor: "#" + (params.fg || "ffffff"),
	isFullscreen: false,
	speed: 2,
	text: params.text || "Hello, World!",
	themes: [params.theme || "monochrome"],
};

const slice = createSlice({
	initialState: initialState,
	name: "app",
	reducers: {
		setBackgroundColor: (state, action) => {
			const newValue = action.payload as string;
			state.backgroundColor = newValue;
		},
		setFontSize: (state, action) => {
			const newValue = action.payload as number;
			state.fontSize = newValue;
		},
		setForegroundColor: (state, action) => {
			const newValue = action.payload as string;
			state.foregroundColor = newValue;
		},
		setIsFullscreen: (state, action) => {
			const newValue = action.payload as boolean;
			state.isFullscreen = newValue;
		},
		setSpeed: (state, action) => {
			const newValue = action.payload as number;
			state.speed = newValue;
		},
		setText: (state, action) => {
			const newValue = action.payload as string;
			state.text = newValue;
		},
		setThemes: (state, action) => {
			const newValue = action.payload as string[];
			state.themes = newValue;
		},
	},
});

export const {
	setBackgroundColor,
	setFontSize,
	setForegroundColor,
	setIsFullscreen,
	setSpeed,
	setText,
	setThemes,
} = slice.actions;
export default slice.reducer;
