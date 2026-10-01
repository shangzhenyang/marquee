import ColorPicker from "@/components/color-picker";
import ColorPickerModal from "@/components/color-picker-modal";
import { useStore } from "@/store";
import type { Key } from "@heroui/react";
import {
	Button,
	Input,
	Label,
	ListBox,
	Select,
	Slider,
	TextField,
} from "@heroui/react";
import { t } from "i18next";
import type { FormEvent, JSX } from "react";
import { useCallback, useState } from "react";

interface ControlAreaProps {
	startFullscreenMarquee: () => Promise<void>;
}

function ControlArea({
	startFullscreenMarquee,
}: ControlAreaProps): JSX.Element {
	const backgroundColor = useStore((state) => state.backgroundColor);
	const fontSize = useStore((state) => state.fontSize);
	const foregroundColor = useStore((state) => state.foregroundColor);
	const speed = useStore((state) => state.speed);
	const text = useStore((state) => state.text);
	const theme = useStore((state) => state.theme);

	const [isBackgroundColorOpen, setIsBackgroundColorOpen] = useState(false);

	const handleBackgroundColorChange = useCallback((newValue: string) => {
		useStore.setState({
			backgroundColor: newValue,
		});
	}, []);

	const handleFontSizeChange = useCallback((newValue: number | number[]) => {
		useStore.setState({
			fontSize: getSliderValue(newValue),
		});
	}, []);

	const handleForegroundColorChange = useCallback((newValue: string) => {
		useStore.setState({
			foregroundColor: newValue,
		});
	}, []);

	const handleMonochromePress = useCallback(() => {
		setIsBackgroundColorOpen(true);
	}, []);

	const handleSpeedChange = useCallback((newValue: number | number[]) => {
		useStore.setState({
			speed: getSliderValue(newValue),
		});
	}, []);

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			void startFullscreenMarquee();
			updateQueryParams({
				bg: backgroundColor.substring(1),
				fg: foregroundColor.substring(1),
				text: text,
				theme: theme,
			});
		},
		[backgroundColor, foregroundColor, startFullscreenMarquee, text, theme],
	);

	const handleTextChange = useCallback((newValue: string) => {
		useStore.setState({
			text: newValue,
		});
	}, []);

	const handleThemeChange = useCallback((newValue: Key | Key[] | null) => {
		if (typeof newValue !== "string") {
			return;
		}
		useStore.setState({
			theme: newValue,
		});
	}, []);

	const renderSelectValue = useCallback(
		({ selectedText }: { selectedText: string }) => {
			return selectedText;
		},
		[],
	);

	return (
		<form
			className="flex flex-col gap-4 justify-center w-full md:w-80"
			onSubmit={handleSubmit}
		>
			<TextField
				id="text"
				onChange={handleTextChange}
				value={text}
			>
				<Label>{t("text")}</Label>
				<Input
					autoComplete="off"
					className="min-h-11 md:min-h-10"
				/>
			</TextField>
			<div className="flex gap-4 justify-around">
				<Select
					className="min-w-0 flex-1"
					id="background-color"
					onChange={handleThemeChange}
					value={theme}
				>
					<Label>{t("backgroundColor")}</Label>
					<Select.Trigger className="min-h-11 md:min-h-10">
						<Select.Value>{renderSelectValue}</Select.Value>
						<Select.Indicator />
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							<ListBox.Item
								id="monochrome"
								onPress={handleMonochromePress}
								textValue={backgroundColor}
							>
								{t("monochrome")}
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="rainbow"
								textValue={t("rainbow")}
							>
								{t("rainbow")}
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="bisexual"
								textValue="Bisexual Pride"
							>
								Bisexual Pride
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="lesbian"
								textValue="Lesbian Pride"
							>
								Lesbian Pride
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="nonbinary"
								textValue="Nonbinary Pride"
							>
								Nonbinary Pride
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="transgender"
								textValue="Transgender Pride"
							>
								Transgender Pride
								<ListBox.ItemIndicator />
							</ListBox.Item>
						</ListBox>
					</Select.Popover>
				</Select>
				<ColorPickerModal
					isOpen={isBackgroundColorOpen}
					onChange={handleBackgroundColorChange}
					setIsOpen={setIsBackgroundColorOpen}
					value={backgroundColor}
				/>
				<ColorPicker
					id="foreground-color"
					label={t("foregroundColor")}
					onChange={handleForegroundColorChange}
					value={foregroundColor}
				/>
			</div>
			<Slider
				id="speed"
				maxValue={10}
				minValue={0}
				onChange={handleSpeedChange}
				value={speed}
			>
				<Label>{t("speed")}</Label>
				<Slider.Output />
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb />
				</Slider.Track>
			</Slider>
			<Slider
				id="font-size"
				maxValue={400}
				minValue={12}
				onChange={handleFontSizeChange}
				value={fontSize}
			>
				<Label>{t("fontSize")}</Label>
				<Slider.Output />
				<Slider.Track>
					<Slider.Fill />
					<Slider.Thumb />
				</Slider.Track>
			</Slider>
			<Button
				fullWidth
				isDisabled={!text}
				type="submit"
			>
				{t("start")}
			</Button>
		</form>
	);
}

function getSliderValue(newValue: number | number[]): number {
	return typeof newValue === "number" ? newValue : newValue[0];
}

function updateQueryParams(params: Record<string, string>): void {
	const searchParams = new URLSearchParams(window.location.search);
	for (const [key, value] of Object.entries(params)) {
		if (value) {
			searchParams.set(key, value);
		} else {
			searchParams.delete(key);
		}
	}
	window.history.replaceState(null, "", `?${searchParams.toString()}`);
}

export default ControlArea;
