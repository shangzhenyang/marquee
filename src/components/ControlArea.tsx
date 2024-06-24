import ColorPicker from "@/components/ColorPicker";
import { useAppSelector } from "@/redux/hooks";
import {
	setBackgroundColor,
	setFontSize,
	setForegroundColor,
	setSpeed,
	setText,
	setTheme,
} from "@/redux/reducers/app";
import { Button, Input, Select, SelectItem, Slider } from "@nextui-org/react";
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
	const backgroundColor = useAppSelector(
		(state) => state.app.backgroundColor,
	);
	const fontSize = useAppSelector((state) => state.app.fontSize);
	const foregroundColor = useAppSelector(
		(state) => state.app.foregroundColor,
	);
	const speed = useAppSelector((state) => state.app.speed);
	const text = useAppSelector((state) => state.app.text);
	const theme = useAppSelector((state) => state.app.theme);

	const updateQueryParams = (params: Record<string, string>): void => {
		const searchParams = new URLSearchParams(window.location.search);
		for (const [key, value] of Object.entries(params)) {
			if (value) {
				searchParams.set(key, value);
			} else {
				searchParams.delete(key);
			}
		}
		window.history.replaceState(null, "", `?${searchParams.toString()}`);
	};

	const handleColorChange = (setter: (newValue: string) => UnknownAction) => {
		return (color: string): void => {
			dispatch(setter(color));
		};
	};

	const handleInputChange = (setter: (newValue: string) => UnknownAction) => {
		return (event: React.ChangeEvent<HTMLInputElement>): void => {
			dispatch(setter(event.target.value));
		};
	};

	const handleRangeChange = (setter: (newValue: number) => UnknownAction) => {
		return (value: number | number[]): void => {
			dispatch(setter(Number(value)));
		};
	};

	const handleSelectChange = (
		setter: (newValue: string) => UnknownAction,
	) => {
		return (event: React.ChangeEvent<HTMLSelectElement>): void => {
			dispatch(setter(event.target.value));
		};
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		startFullscreenMarquee();
		updateQueryParams({
			bg: backgroundColor.substring(1),
			fg: foregroundColor.substring(1),
			text: text,
			theme: theme,
		});
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
				onChange={handleInputChange(setText)}
				size="lg"
				type="text"
				value={text}
			/>
			<div className="flex gap-4 justify-around">
				<ColorPicker
					id="background-color"
					label={t("backgroundColor")}
					onChange={handleColorChange(setBackgroundColor)}
					value={backgroundColor}
				/>
				<ColorPicker
					id="foreground-color"
					label={t("foregroundColor")}
					onChange={handleColorChange(setForegroundColor)}
					value={foregroundColor}
				/>
			</div>
			<Select
				defaultSelectedKeys={[theme]}
				label={t("theme")}
				onChange={handleSelectChange(setTheme)}
				value={theme}
			>
				<SelectItem key="monochrome">{t("monochrome")}</SelectItem>
				<SelectItem key="rainbow">{t("rainbow")}</SelectItem>
				<SelectItem key="bisexual">Bisexual Pride</SelectItem>
				<SelectItem key="lesbian">Lesbian Pride</SelectItem>
				<SelectItem key="nonbinary">Nonbinary Pride</SelectItem>
				<SelectItem key="transgender">Transgender Pride</SelectItem>
			</Select>
			<Slider
				id="speed"
				label={t("speed")}
				maxValue={10}
				minValue={0}
				onChange={handleRangeChange(setSpeed)}
				showTooltip={true}
				value={speed}
			/>
			<Slider
				id="font-size"
				label={t("fontSize")}
				maxValue={400}
				minValue={12}
				onChange={handleRangeChange(setFontSize)}
				showTooltip={true}
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
