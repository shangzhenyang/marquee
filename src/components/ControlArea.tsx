import ColorPicker from "@/components/ColorPicker";
import { useAppSelector } from "@/redux/hooks";
import { setBackgroundColor, setFontSize, setForegroundColor, setSpeed, setText } from "@/redux/reducers/app";
import { Button, Input, Slider } from "@nextui-org/react";
import { UnknownAction } from "@reduxjs/toolkit";
import { t } from "i18next";
import { useDispatch } from "react-redux";

interface ControlAreaProps {
	startFullscreenMarquee: () => void;
}

function ControlArea({
	startFullscreenMarquee,
}: ControlAreaProps): JSX.Element {
	const dispatch = useDispatch();
	const backgroundColor = useAppSelector((state) => {
		return state.app.backgroundColor;
	});
	const fontSize = useAppSelector((state) => {
		return state.app.fontSize;
	});
	const foregroundColor = useAppSelector((state) => {
		return state.app.foregroundColor;
	});
	const speed = useAppSelector((state) => {
		return state.app.speed;
	});
	const text = useAppSelector((state) => {
		return state.app.text;
	});

	const updateQueryParams = (key: string, value: string): void => {
		const searchParams = new URLSearchParams(window.location.search);
		if (value) {
			searchParams.set(key, value);
		} else {
			searchParams.delete(key);
		}
		window.history.replaceState(null, "", `?${searchParams.toString()}`);
	};

	const handleColorChange = (
		setter: (newValue: string) => UnknownAction,
		queryKey: string,
	) => {
		return (color: string): void => {
			dispatch(setter(color));
			updateQueryParams(queryKey, color.substring(1));
		};
	};

	const handleInputChange = (
		setter: (newValue: string) => UnknownAction,
		queryKey: string,
	) => {
		return (event: React.ChangeEvent<HTMLInputElement>): void => {
			dispatch(setter(event.target.value));
			updateQueryParams(queryKey, event.target.value);
		};
	};

	const handleRangeChange = (
		setter: (newValue: number) => UnknownAction,
		queryKey: string,
	) => {
		return (value: number | number[]): void => {
			dispatch(setter(Number(value)));
			updateQueryParams(queryKey, value.toString());
		};
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		startFullscreenMarquee();
	};

	return (
		<form
			className="flex flex-col gap-4 justify-center w-100 md:w-80"
			onSubmit={handleSubmit}
		>
			<Input
				autoComplete="off"
				id="text"
				label={t("text")}
				onChange={handleInputChange(setText, "text")}
				type="text"
				value={text}
			/>
			<div className="flex gap-4 justify-around">
				<ColorPicker
					id="background-color"
					label={t("backgroundColor")}
					onChange={handleColorChange(setBackgroundColor, "bg")}
					value={backgroundColor}
				/>
				<ColorPicker
					id="foreground-color"
					label={t("foregroundColor")}
					onChange={handleColorChange(setForegroundColor, "fg")}
					value={foregroundColor}
				/>
			</div>
			<Slider
				id="speed"
				label={t("speed")}
				maxValue={10}
				minValue={0}
				onChange={handleRangeChange(setSpeed, "speed")}
				value={speed}
			/>
			<Slider
				id="font-size"
				label={t("fontSize")}
				maxValue={400}
				minValue={12}
				onChange={handleRangeChange(setFontSize, "size")}
				value={fontSize}
			/>
			<Button
				color="primary"
				isDisabled={!text}
				type="submit"
			>
				{t("start")}
			</Button>
		</form>
	);
}

export default ControlArea;