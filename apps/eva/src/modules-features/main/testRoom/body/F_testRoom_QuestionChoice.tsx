import { Checkbox, CheckboxGroupProps, Flex, Radio, RadioGroupProps } from "@mantine/core";
import MyQuestionContainer, { MyQuestionContainerProps } from "./MyQuestionContainer";

interface Question_Choice_Props extends MyQuestionContainerProps {
    options?: { value: string; label: string }[];
    isMultipleChoice?: boolean;
    checkBoxGroupProps?: Omit<CheckboxGroupProps, "children">
    radioGroupProps?: Omit<RadioGroupProps, "children">
}

export default function F_testRoom_QuestionChoice({

    isMultipleChoice,
    checkBoxGroupProps,
    radioGroupProps,
    options,
    ...rest
}: Question_Choice_Props) {
    if (isMultipleChoice) return (
        <MyQuestionContainer {...rest}>
            <Checkbox.Group
                {...checkBoxGroupProps}
            >
                <Flex mt="xs" direction="column" gap="md">
                    {options?.map((item) => (
                        <Checkbox key={item.value} value={item.value} label={item.label} />
                    ))}
                </Flex>
            </Checkbox.Group>
        </MyQuestionContainer>
    )
    return (
        <MyQuestionContainer {...rest}>
            <Radio.Group
                {...radioGroupProps}
            >
                <Flex mt="xs" direction="column" gap="md">
                    {options?.map((item) => (
                        <Radio key={item.value} value={item.value} label={item.label} />
                    ))}
                </Flex>
            </Radio.Group>
        </MyQuestionContainer>
    )
}
