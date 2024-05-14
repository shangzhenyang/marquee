import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	backgroundColor: "#000000",
	fontSize: 120,
	foregroundColor: "#ffffff",
	isFullscreen: false,
	speed: 2,
	text: "Hello, World!",
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
