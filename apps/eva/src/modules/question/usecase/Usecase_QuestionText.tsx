import { Group } from "@mantine/core"
import { MyTextInput } from "aq-fe-framework/core"
import Usecase_QuestionWrapper, { Usecase_QuestionWrapperProps } from "./Usecase_QuestionWrapper"

interface Props extends Usecase_QuestionWrapperProps {
    value?: string
    onChange: (values: string) => void

}

export default function Usecase_QuestionText({
    value,
    onChange,
    questionIndex,
    title
}: Props) {
    return (
        <Usecase_QuestionWrapper title={title} questionIndex={questionIndex}>
            <Group>
                <MyTextInput
                    value={value}
                    onChange={e => onChange(e.currentTarget.value)}
                />
            </Group>
        </Usecase_QuestionWrapper>
    )
}
