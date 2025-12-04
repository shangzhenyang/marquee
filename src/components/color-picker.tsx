import ColorPickerModal from "@/components/color-picker-modal";
import { Input } from "@heroui/react";
import { JSX, useCallback, useState } from "react";

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
	const [isOpen, setIsOpen] = useState(false);

	const handleInputClick = useCallback((): void => {
		setIsOpen(true);
	}, []);

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
				isOpen={isOpen}
				onChange={onChange}
				setIsOpen={setIsOpen}
				value={value}
			/>
		</>
	);
}

export default ColorPicker;
