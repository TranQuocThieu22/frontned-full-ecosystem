import { Loader, TextInput, TextInputProps } from "@mantine/core";
import { useEffect, useState } from "react";

/**
 * Chạy callback sau X ms nếu value không đổi
 * @param value     Giá trị cần theo dõi
 * @param delay     Thời gian debounce (ms)
 * @param callback  Hàm sẽ chạy sau khi value ổn định
 */
export default function TextInputDebounceSearch(
    {
        isLoading,
        delay,
        onEndDebounce,
        ...rest
    }: {
        isLoading?: boolean,
        delay: number,
        onEndDebounce: (val: string | undefined) => void
    } & TextInputProps) {
    const [newValue, setNewValue] = useState<string | undefined>()

    useEffect(() => {
        const handler = setTimeout(() => {
            onEndDebounce(newValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [newValue, delay]);

    return (
        <TextInput
            rightSection={isLoading ? <Loader size={18} /> : undefined}
            disabled={isLoading}
            onChange={(event) => {
                setNewValue(event.currentTarget?.value);
            }}
            {...rest}
        />
    )
}