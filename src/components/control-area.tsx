import ColorPicker from "@/components/color-picker";
import ColorPickerModal from "@/components/color-picker-modal";
import {
	backgroundColor,
	fontSize,
	foregroundColor,
	speed,
	text,
	themes,
} from "@/signals";
import { Button, Input, Select, SelectItem, Slider } from "@heroui/react";
import { Signal } from "@preact/signals";
import { t } from "i18next";
import { JSX, useCallback, useState } from "react";

interface ControlAreaProps {
	startFullscreenMarquee: () => Promise<void>;
}

function ControlArea({
	startFullscreenMarquee,
}: ControlAreaProps): JSX.Element {
	const [isBackgroundColorOpen, setIsBackgroundColorOpen] = useState(false);

	const handleColorChange = (signal: Signal<string>) => {
		return (newValue: string): void => {
			signal.value = newValue;
		};
	};

	const handleInputChange = (signal: Signal<string>) => {
		return (event: React.ChangeEvent<HTMLInputElement>): void => {
			signal.value = event.target.value;
		};
	};

	const handleRangeChange = (signal: Signal<number>) => {
		return (newValue: number | number[]): void => {
			signal.value =
				typeof newValue === "number" ? newValue : newValue[0];
		};
	};

	const handleThemeChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>): void => {
			if (
				event.target.value === "monochrome" ||
				(!event.target.value && themes.value[0] === "monochrome")
			) {
				setIsBackgroundColorOpen(true);
			}
			if (!event.target.value) {
				return;
			}
			themes.value = [event.target.value];
		},
		[setIsBackgroundColorOpen],
	);

	const updateQueryParams = useCallback(
		(params: Record<string, string>): void => {
			const searchParams = new URLSearchParams(window.location.search);
			for (const [key, value] of Object.entries(params)) {
				if (value) {
					searchParams.set(key, value);
				} else {
					searchParams.delete(key);
				}
			}
			window.history.replaceState(
				null,
				"",
				`?${searchParams.toString()}`,
			);
		},
		[],
	);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			void startFullscreenMarquee();
			updateQueryParams({
				bg: backgroundColor.value.substring(1),
				fg: foregroundColor.value.substring(1),
				text: text.value,
				theme: themes.value[0],
			});
		},
		[startFullscreenMarquee, updateQueryParams],
	);

	return (
		<form
			className="flex flex-col gap-4 justify-center w-full md:w-80"
			onSubmit={handleSubmit}
		>
			<Input
				autoComplete="off"
				id="text"
				label={t("text")}
				onChange={handleInputChange(text)}
				size="lg"
				type="text"
				value={text.value}
			/>
			<div className="flex gap-4 justify-around">
				<Select
					id="background-color"
					label={t("backgroundColor")}
					onChange={handleThemeChange}
					selectedKeys={themes.value}
					size="lg"
				>
					<SelectItem
						key="monochrome"
						textValue={backgroundColor.value}
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
					isOpen={isBackgroundColorOpen}
					onChange={handleColorChange(backgroundColor)}
					setIsOpen={setIsBackgroundColorOpen}
					value={backgroundColor.value}
				/>
				<ColorPicker
					id="foreground-color"
					label={t("foregroundColor")}
					onChange={handleColorChange(foregroundColor)}
					value={foregroundColor.value}
				/>
			</div>
			<Slider
				id="speed"
				label={t("speed")}
				maxValue={10}
				minValue={0}
				onChange={handleRangeChange(speed)}
				showTooltip={true}
				value={speed.value}
			/>
			<Slider
				id="font-size"
				label={t("fontSize")}
				maxValue={400}
				minValue={12}
				onChange={handleRangeChange(fontSize)}
				showTooltip={true}
				value={fontSize.value}
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
