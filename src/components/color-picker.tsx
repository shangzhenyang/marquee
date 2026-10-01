import ColorPickerModal from "@/components/color-picker-modal";
import { Input, Label, TextField } from "@heroui/react";
import type { JSX } from "react";
import { useCallback, useState } from "react";

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
			<TextField
				className="min-w-0 flex-1"
				id={id}
				isReadOnly
				value={value}
			>
				<Label>{label}</Label>
				<Input
					autoComplete="off"
					className="min-h-11 md:min-h-10"
					onClick={handleInputClick}
				/>
			</TextField>
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
