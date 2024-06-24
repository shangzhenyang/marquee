import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
} from "@nextui-org/react";
import { t } from "i18next";
import { ChangeEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";

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

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		handleColorChange("#" + event.target.value);
	};

	const isDark = (color: string): boolean => {
		const [r, g, b] = color
			.slice(1)
			.match(/.{1,2}/g)
			?.map((value) => {
				return parseInt(value, 16);
			}) || [0, 0, 0];
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
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
			<Modal
				isOpen={isOpen}
				onClose={closeColorPicker}
			>
				<ModalContent>
					<ModalBody className="items-center pb-0 pt-6">
						<HexColorPicker
							color={value}
							onChange={handleColorChange}
						/>
					</ModalBody>
					<ModalFooter className="flex items-center justify-between">
						<Input
							aria-label={t("colorValue")}
							onChange={handleInputChange}
							startContent="#"
							value={value.substring(1)}
						/>
						<Button
							onClick={closeColorPicker}
							style={{
								backgroundColor: value,
								color: isDark(value) ? "white" : "black",
							}}
						>
							{t("ok")}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ColorPicker;
