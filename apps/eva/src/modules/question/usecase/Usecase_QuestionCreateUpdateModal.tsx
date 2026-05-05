import { Modal, ModalProps, SimpleGrid, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MyButton, MyRichTextEditor, MySelect, MyTextInput } from "aq-fe-framework/core";
import { QuestionDomain } from "../domain/QuestionDomain";



interface Props extends Omit<ModalProps, "onChange"> {
    form: UseFormReturnType<QuestionDomain>
    onSubmit?: () => void
}

export default function Usecase_QuestionCreateUpdateModal({
    form,
    onSubmit,
    ...rest
}: Props) {
    return (
        <Modal size={"80%"} title="Chi tiết câu hỏi" {...rest} >
            <Stack>
                <SimpleGrid cols={{ base: 1, md: 3 }}>
                    <MyTextInput label="Mã câu hỏi" {...form.getInputProps("questionCode")} />
                    <MySelect label="Loại câu hỏi"  {...form.getInputProps("questionTypeId")} />
                    <MySelect label="Chương"  {...form.getInputProps("topicId")} />
                    <MySelect label="Độ khó"  {...form.getInputProps("difficultyId")} />
                    <MySelect label="Nhận thức"  {...form.getInputProps("levelOfAwarenessId")} />
                    <MySelect label="CLO môn học"  {...form.getInputProps("cloCodeId")} />
                </SimpleGrid>
                <MyRichTextEditor inputWrapperProps={{ label: "Nội dung câu hỏi" }} {...form.getInputProps("questionContent")} />
                <MyButton actionType="save" onClick={onSubmit} />
            </Stack>
        </Modal>
    )
}
