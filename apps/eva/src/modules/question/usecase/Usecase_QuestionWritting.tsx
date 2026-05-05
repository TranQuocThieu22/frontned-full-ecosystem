import { MyRichTextEditor } from "aq-fe-framework/core"
import Usecase_QuestionWrapper, { Usecase_QuestionWrapperProps } from "./Usecase_QuestionWrapper"

interface Props extends Usecase_QuestionWrapperProps {
    value: string
    onChange: (values: string) => void

}

export default function Usecase_QuestionWritting({
    value,
    onChange,
    questionIndex,
    title
}: Props) {
    return (
        <Usecase_QuestionWrapper title={title} questionIndex={questionIndex}>
            <MyRichTextEditor
                value={value}
                onChange={onChange}
            />
        </Usecase_QuestionWrapper>
    )
}
