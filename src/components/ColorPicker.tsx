import { Button, Chip, Input } from "@nextui-org/react";
import { t } from "i18next";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ReactModal from "react-modal";

interface ColorPickerProps {
	id: string;
	label: string;
	onChange: (newValue: string) => void;
	value: string;
}

function ColorPicker({
	id,
	label,
	onChange,
	value,
}: ColorPickerProps): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const closeColorPicker = (): void => {
		setIsOpen(false);
	};

	const handleColorChange = (color: string): void => {
		onChange(color);
	};

	const handleInputClick = (): void => {
		setIsOpen(true);
	};

	const isDark = (color: string): boolean => {
		const [r, g, b] = color
			.slice(1)
			.match(/.{1,2}/g)
			?.map((value) => {
				return parseInt(value, 16);
			}) || [0, 0, 0];
		const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return brightness < 128;
	};

	return (
		<>
			<Input
				autoComplete="off"
				id={id}
				label={label}
				onClick={handleInputClick}
				readOnly={true}
				size="lg"
				type="text"
				value={value}
			/>
			<ReactModal
				className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg border border-gray-300 shadow-lg dark:bg-gray-800 dark:border-gray-700"
				isOpen={isOpen}
				overlayClassName="backdrop-blur fixed left-0 top-0 w-full h-full z-10 fade-in"
				onRequestClose={closeColorPicker}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
			>
				<HexColorPicker
					color={value}
					onChange={handleColorChange}
				/>
				<div className="mt-4 flex items-center justify-between">
					<Chip
						style={{
							backgroundColor: value,
							color: isDark(value) ? "white" : "black",
						}}
					>
						{value}
					</Chip>
					<Button onClick={closeColorPicker}>
						{t("ok")}
					</Button>
				</div>

			</ReactModal>
		</>
	);
}

export default ColorPicker;
