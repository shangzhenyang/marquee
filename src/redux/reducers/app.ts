import { createSlice } from "@reduxjs/toolkit";

const params = Object.fromEntries(
	new URLSearchParams(window.location.search).entries(),
) as Record<string, string | undefined>;

function getNumberOrDefault(
	value: string | undefined,
	defaultValue: number,
): number {
	if (value === undefined) {
		return defaultValue;
	}
	const number = Number(value);
	if (isNaN(number)) {
		return defaultValue;
	}
	return number;
}

const initialState = {
	backgroundColor: "#" + (params.bg || "000000"),
	fontSize: getNumberOrDefault(params.size, 120),
	foregroundColor: "#" + (params.fg || "ffffff"),
	isFullscreen: false,
	speed: getNumberOrDefault(params.speed, 2),
	text: params.text || "Hello, World!",
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
	},
});

export const {
	setBackgroundColor,
	setFontSize,
	setForegroundColor,
	setIsFullscreen,
	setSpeed,
	setText,
} = slice.actions;
export default slice.reducer;
