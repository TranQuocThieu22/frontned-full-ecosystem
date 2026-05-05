import { InputWrapper, InputWrapperProps } from "@mantine/core";
import { ReactNode } from "react";

interface CustomInputWrapperProps extends InputWrapperProps {
    children?: ReactNode
}

export default function CustomInputWrapper({
    children,
    ...rest
}: CustomInputWrapperProps) {
    return (
        <InputWrapper
            inputWrapperOrder={['label', 'input', 'error', 'description']}
            {...rest}
        >
            {children}
        </InputWrapper>
    )
}
