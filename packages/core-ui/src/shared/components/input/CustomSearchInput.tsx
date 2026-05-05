import { CustomTextInput, MyTextInputProps } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { IconSearch } from "@tabler/icons-react";
import { CloseButton } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState, useTransition, useEffect } from "react";

export function useCustomSearchInputState(initialValue: string | undefined = undefined, delay = 500) {
    const searchInputState = useState<string | undefined>(initialValue);
    const [debouncedValue] = useDebouncedValue(searchInputState[0], delay);

    // Nếu giá trị debounced là chuỗi rỗng, trả về undefined
    const debouncedSearch = debouncedValue === "" ? undefined : debouncedValue;

    return { searchInputState, debouncedSearch };
}

export interface CustomSearchInputProps extends MyTextInputProps {
    clearable?: boolean;
}

export function CustomSearchInput({ clearable = true, value, onChange, ...rest }: CustomSearchInputProps) {
    const [localValue, setLocalValue] = useState(value ?? "");
    const [isPending, startTransition] = useTransition();

    // Đồng bộ nếu giá trị được thay đổi từ bên ngoài (ví dụ reset)
    useEffect(() => {
        if (value !== localValue) {
            setLocalValue(value ?? "");
        }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setLocalValue(newValue); // Cập nhật ngay để gõ phím mượt

        // Đánh dấu việc cập nhật lên component cha là độ ưu tiên thấp (chạy ngầm)
        // Điều này giúp React không chặn việc hiển thị chữ bạn đang gõ
        startTransition(() => {
            onChange?.(e);
        });
    };

    const handleClear = () => {
        setLocalValue("");
        const event = { currentTarget: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
        startTransition(() => {
            onChange?.(event);
        });
    };

    return (
        <CustomTextInput
            w={'280'}
            placeholder="Tìm theo mã hoặc tên"
            leftSection={<IconSearch size={16} />}
            {...rest}
            value={localValue}
            onChange={handleInputChange}
            rightSection={
                clearable && localValue ? (
                    <CloseButton
                        size="sm"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleClear}
                        tabIndex={-1}
                    />
                ) : rest.rightSection
            }
        />
    );
}
