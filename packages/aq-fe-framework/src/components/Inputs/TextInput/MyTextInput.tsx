import { TextInput, TextInputProps } from '@mantine/core';

interface IMyTextInput extends TextInputProps {
    label?: string; defaultValue?: string,
    isPhoneNumber?: boolean
}
/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `MyTextInput` từ `core` thay thế.
 */
export function MyTextInput({ label, defaultValue, isPhoneNumber, ...rest }: IMyTextInput) {
    return (
        <TextInput
            onKeyDown={(e) => {
                if (!isPhoneNumber) return
                const allowedKeys = [
                    "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete",
                    "+", "-", "(", ")", " ", // các ký tự đặc biệt cho số điện thoại
                ]
                if (
                    !/[0-9]/.test(e.key) &&
                    !allowedKeys.includes(e.key)
                ) {
                    e.preventDefault()
                }
            }}
            label={label}
            defaultValue={defaultValue}
            placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}
            {...rest}
        />
    )
}
