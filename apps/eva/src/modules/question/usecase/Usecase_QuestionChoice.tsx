import { Checkbox, Flex, Radio } from "@mantine/core"
import Usecase_QuestionWrapper, { Usecase_QuestionWrapperProps } from "./Usecase_QuestionWrapper"

interface IQuestionChoiceAnswer {
    value?: string
    label?: string
}

interface IQuestionChoiceProps extends Usecase_QuestionWrapperProps {
    data: IQuestionChoiceAnswer[]
    value: string[]
    onChange: (values: string[]) => void
    isMultipleChoice?: boolean
}

export default function Usecase_QuestionChoice({
    isMultipleChoice,
    data,
    value,
    onChange,
    questionIndex,
    title
}: IQuestionChoiceProps) {
    if (isMultipleChoice)
        return (
            <Usecase_QuestionWrapper questionIndex={questionIndex} title={title}>
                <Checkbox.Group value={value} onChange={onChange}>
                    <Flex mt="xs" direction="column" gap="md">
                        {data?.map((item) => (
                            <Checkbox key={item.value} value={item.value} label={item.label} />
                        ))}
                    </Flex>
                </Checkbox.Group>
            </Usecase_QuestionWrapper>
        );

    return (
        <Usecase_QuestionWrapper questionIndex={questionIndex} title={title}>
            <Radio.Group
                value={value[0] || ""}
                onChange={(val) => onChange([val])}
            >
                <Flex mt="xs" direction="column" gap="md">
                    {data?.map((item) => (
                        <Radio key={item.value} value={item.value} label={item.label} />
                    ))}
                </Flex>
            </Radio.Group>
        </Usecase_QuestionWrapper>
    );
}
