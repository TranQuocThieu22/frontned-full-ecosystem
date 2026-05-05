import { Space, TextInput } from "@mantine/core";
import { IconTextCaption } from "@tabler/icons-react";
import { MyTextEditor } from "aq-fe-framework/components";
import MyQuestionContainer, { MyQuestionContainerProps } from "./MyQuestionContainer";

interface Question_Writting_Props extends MyQuestionContainerProps {
    isCorrectFilling?: boolean
}

export default function F_testRoom_QuestionWritting({
    isCorrectFilling,
    ...rest
}: Question_Writting_Props) {
    return (
        <MyQuestionContainer {...rest}>
            <Space />
            {isCorrectFilling ? <TextInput leftSection={<IconTextCaption />} w={'300px'} /> : <MyTextEditor onChange={() => { }} contentHeight="150px" />}

        </MyQuestionContainer>
    )
}
