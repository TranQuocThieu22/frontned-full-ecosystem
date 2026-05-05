import { Button, Flex, Stack } from "@mantine/core";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { MyRichTextEditor } from "aq-fe-framework/core";
import { IAnswerDomain } from "../domain/IAnswerDomain";



interface Props {
    value?: IAnswerDomain
    onChange: (value: IAnswerDomain) => void,
    onAddAnswer?: () => void
    onSaveAnswer?: () => void
}

export default function Usecase_AnswerAdd({
    value,
    onChange,
    onAddAnswer,
    onSaveAnswer
}: Props) {
    return (
        <Stack>
            <MyRichTextEditor
                inputWrapperProps={{ label: "Nội dung lựa chọn" }}
                value={value?.content}
                onBlur={(e) => onChange({ ...value, content: e })}
            />
            <MyRichTextEditor
                inputWrapperProps={{ label: "Phân tích đáp án" }}
                value={value?.explain}
                onBlur={(e) => onChange({ ...value, explain: e })}
            />
            <Flex justify={"end"} align={'end'}>
                <Button
                    hidden={!onAddAnswer}
                    leftSection={<IconPlus />}
                    onClick={onAddAnswer}
                >
                    Thêm lựa chọn
                </Button>
                <Button
                    hidden={!onSaveAnswer}
                    color="yellow"
                    leftSection={<IconDeviceFloppy />}
                    onClick={onSaveAnswer}
                >
                    Lưu lựa chọn
                </Button>
            </Flex>
        </Stack>
    )
}
