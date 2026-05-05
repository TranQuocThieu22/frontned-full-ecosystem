import { CustomTextInput, MyTextInputProps } from "./CustomTextInput";

interface CustomPhoneNumberInputProps extends MyTextInputProps { }

export function CustomPhoneNumberInput(props: CustomPhoneNumberInputProps) {
    return (
        <CustomTextInput
            {...props}
            onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (e.ctrlKey || e.metaKey) return;
                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                }
            }}
            onChange={(e) => {
                const digits = e.currentTarget.value.replace(/\D/g, "");
                if (digits.length > 10) {
                    e.currentTarget.value = digits.slice(0, 10);
                }
                props.onChange?.(e);
            }}
        />
    );
}
