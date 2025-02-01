import ColorPickerModal from "@/components/color-picker-modal";
import { Input } from "@nextui-org/react";
import { JSX, useState } from "react";

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

	const handleInputClick = (): void => {
		setIsOpen(true);
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
			<ColorPickerModal
				onChange={onChange}
				value={value}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
}

export default ColorPicker;
