import { Button, InputGroup, Modal, TextField } from "@heroui/react";
import { t } from "i18next";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useCallback } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerModalProps {
	isOpen: boolean;
	onChange: (newValue: string) => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	value: string;
}

function ColorPickerModal({
	isOpen,
	onChange,
	setIsOpen,
	value,
}: ColorPickerModalProps): JSX.Element {
	const closeColorPicker = useCallback((): void => {
		setIsOpen(false);
	}, [setIsOpen]);

	const handleInputChange = useCallback(
		(newValue: string): void => {
			onChange(`#${newValue}`);
		},
		[onChange],
	);

	return (
		<Modal.Backdrop
			isOpen={isOpen}
			onOpenChange={setIsOpen}
		>
			<Modal.Container size="sm">
				<Modal.Dialog>
					<Modal.CloseTrigger />
					<Modal.Body className="flex items-center justify-center pt-6">
						<HexColorPicker
							color={value}
							onChange={onChange}
						/>
					</Modal.Body>
					<Modal.Footer className="flex items-center justify-between">
						<TextField
							aria-label={t("colorValue")}
							className="flex-1"
							onChange={handleInputChange}
							value={value.substring(1)}
						>
							<InputGroup>
								<InputGroup.Prefix>#</InputGroup.Prefix>
								<InputGroup.Input />
							</InputGroup>
						</TextField>
						<Button
							autoFocus
							onPress={closeColorPicker}
							style={{
								backgroundColor: value,
								color: checkIfColorDark(value)
									? "white"
									: "black",
							}}
						>
							{t("ok")}
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}

function checkIfColorDark(color: string): boolean {
	const [red, green, blue] = color
		.slice(1)
		.match(/.{1,2}/g)
		?.map((value) => {
			return parseInt(value, 16);
		}) || [0, 0, 0];
	const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
	return brightness < 128;
}

export default ColorPickerModal;
