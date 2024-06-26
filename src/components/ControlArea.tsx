import ColorPicker from "@/components/ColorPicker";
import ColorPickerModal from "@/components/ColorPickerModal";
import { useAppSelector } from "@/redux/hooks";
import {
	setBackgroundColor,
	setFontSize,
	setForegroundColor,
	setSpeed,
	setText,
	setThemes,
} from "@/redux/reducers/app";
import { Button, Input, Select, SelectItem, Slider } from "@nextui-org/react";
import { UnknownAction } from "@reduxjs/toolkit";
import { t } from "i18next";
import { useState } from "react";
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
	const themes = useAppSelector((state) => state.app.themes);

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

	const handleThemeChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	): void => {
		if (
			event.target.value === "monochrome" ||
			(!event.target.value && themes[0] === "monochrome")
		) {
			setIsBackgroundColorOpen(true);
		}
		if (!event.target.value) {
			return;
		}
		dispatch(setThemes([event.target.value]));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		startFullscreenMarquee();
		updateQueryParams({
			bg: backgroundColor.substring(1),
			fg: foregroundColor.substring(1),
			text: text,
			theme: themes[0],
		});
	};

	const [isBackgroundColorOpen, setIsBackgroundColorOpen] =
		useState<boolean>(false);

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
				<Select
					id="background-color"
					label={t("backgroundColor")}
					onChange={handleThemeChange}
					selectedKeys={themes}
					size="lg"
				>
					<SelectItem
						key="monochrome"
						textValue={backgroundColor}
					>
						{t("monochrome")}
					</SelectItem>
					<SelectItem key="rainbow">{t("rainbow")}</SelectItem>
					<SelectItem key="bisexual">Bisexual Pride</SelectItem>
					<SelectItem key="lesbian">Lesbian Pride</SelectItem>
					<SelectItem key="nonbinary">Nonbinary Pride</SelectItem>
					<SelectItem key="transgender">Transgender Pride</SelectItem>
				</Select>
				<ColorPickerModal
					onChange={handleColorChange(setBackgroundColor)}
					value={backgroundColor}
					isOpen={isBackgroundColorOpen}
					setIsOpen={setIsBackgroundColorOpen}
				/>
				<ColorPicker
					id="foreground-color"
					label={t("foregroundColor")}
					onChange={handleColorChange(setForegroundColor)}
					value={foregroundColor}
				/>
			</div>
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
