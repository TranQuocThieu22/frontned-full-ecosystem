import { NumberInput, NumberInputProps } from "@mantine/core";
import { IconNumbers } from "@tabler/icons-react";

interface INumberInput extends NumberInputProps {
  label?: string;
  minValue?: number;
  maxValue?: number;
}

/**
 * @deprecated 
 * Vui lòng dùng `CustomNumberInput` từ `core` thay thế.(Có hỗ trợ input tiền tệ)
 */
export function MyNumberInput({ minValue, maxValue, label, ...rest }: INumberInput) {
  return (
    <NumberInput
      label={label}
      min={minValue ? minValue : 0}
      max={maxValue ? maxValue : 100}
      placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}
      rightSection={<IconNumbers />}
      {...rest}
    />
  );
}
