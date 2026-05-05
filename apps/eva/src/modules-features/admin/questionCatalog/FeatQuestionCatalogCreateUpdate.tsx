import { CLOService } from "@/shared/APIs/CLOService";
import { cognitionService } from "@/shared/APIs/cognitionService";
import { difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { questionService } from "@/shared/APIs/questionService";
import { topicService } from "@/shared/APIs/topicService";
import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType";
import { useStoreFilterSubject } from "@/shared/features/FilterSubject/useStoreFilterSubject";
import { Question } from "@/shared/interfaces/Question";
import { QuestionAnswer } from "@/shared/interfaces/QuestionAnswer";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { MyRichTextEditor, MySelect, MySelectFromAPI, MyTextInput } from "aq-fe-framework/core";
import { utils_converter_mapEnumToSelectData, utils_list_isFieldUnique, utils_list_isTotalEqual, utils_text_getNormalizedTextFromHtml } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import FeatQuestionEditorRubric from "./FeatQuestionEditorRubric";
import MyQuestionChoice, { IQuestionChoiceAnswer } from "./QuestionTypes/MyQuestionChoice";
import MyQuestionEditor, { IQuestionEditorAnswer } from "./QuestionTypes/MyQuestionEditor";
import MyQuestionLink, { IMyQuestionLinkAnswer } from "./QuestionTypes/MyQuestionLink";
import MyQuestionPlankText, { IQuestionPlankTextAnswer } from "./QuestionTypes/MyQuestionPlankText";
import MyQuestionWritting, { IQuestionWrittingAnswer } from "./QuestionTypes/MyQuestionWritting";



function notificationNotEqual100() {
    notifications.show({
        message: "Trọng số không bằng 100, vui lòng kiểm tra lại",
        color: "red"
    })
}
export default function FeatQuestionCatalogCreateUpdate({ values }: { values?: Question }) {
    const form = useForm<Question>({
        mode: "uncontrolled",
        validate: {
            code: isNotEmpty("Không được để trống!")
        }
    })

    const filterSubjectStore = useStoreFilterSubject()
    const [questionType, setQuestionType] = useState<number>(enum_questionType.SingleChoice);

    const answerSingleState = useState<IQuestionChoiceAnswer[]>([])
    const answerEditorState = useState<IQuestionEditorAnswer[]>([])
    const answerMultipleState = useState<IQuestionChoiceAnswer[]>([])
    const answerWrittingState = useState<IQuestionWrittingAnswer>({})
    const answerPlankTextState = useState<IQuestionPlankTextAnswer[]>([])
    const answerLinkState = useState<IMyQuestionLinkAnswer[]>([])
    const rubricIdState = useState<string | null>()

    function resetValue() {
        answerEditorState[1]([])
        answerEditorState[1]([])
        answerMultipleState[1]([])
        answerWrittingState[1]({})
        answerPlankTextState[1]([])
        setQuestionType(enum_questionType.SingleChoice)
    }

    function handleSubmit() {
        const formData = form.getValues()
        let evaQuestionAnswersFinal: QuestionAnswer[] = []
        const normalized = utils_text_getNormalizedTextFromHtml(formData.content || "")
        if (!normalized) {
            notifications.show({ message: "Nội dung câu hỏi không được để trống", color: "red" })
            return false
        }
        if (questionType == enum_questionType.SingleChoice) {
            if (answerSingleState[0].length == 0) {
                notifications.show({
                    message: "Câu hỏi trắc nghiệm phải có ít nhất 1 đáp án",
                    color: "red"
                })
                return false
            }
            if (!utils_list_isTotalEqual(answerSingleState[0].filter(item => item.status != "removed") || [], "density", 100)) {
                notificationNotEqual100()
                return false
            }
            evaQuestionAnswersFinal = answerSingleState[0]?.map(item => ({ // Các câu trả lời
                id: item.status == "added" ? 0 : item.id,
                code: "string",
                name: "string",
                concurrencyStamp: "string",
                isEnabled: item.status == "removed" ? false : true,
                type: questionType,
                density: item.density,
                content: item.content,
                descriptionContent: item.explain,
            })) || []
        }

        if (questionType == enum_questionType.MultipleChoice) {
            if (answerMultipleState[0].length == 0) {
                notifications.show({
                    message: "Câu hỏi trắc nghiệm phải có ít nhất 1 đáp án",
                    color: "red"
                })
                return false
            }
            if (!utils_list_isTotalEqual(answerMultipleState[0].filter(item => item.status != "removed") || [], "density", 100)) {
                notificationNotEqual100()
                return false
            }
            evaQuestionAnswersFinal = answerMultipleState[0]?.map(item => ({ // Các câu trả lời
                id: 0,
                code: "string",
                name: "string",
                concurrencyStamp: "string",
                isEnabled: true,
                type: questionType,
                density: item.density,
                content: item.content,
                descriptionContent: item.explain,
            })) || []
        }

        if (questionType == enum_questionType.TextEditor) {
            if (answerEditorState[0]?.length > 0 && !utils_list_isTotalEqual(answerEditorState[0] || [], "density", 100)) {
                notificationNotEqual100()
                return false
            }
            evaQuestionAnswersFinal = answerEditorState[0]?.map(item => ({
                id: 0,
                code: "string",
                name: "string",
                concurrencyStamp: "string",
                isEnabled: true,
                type: questionType,
                density: item.density,
                content: item.content
            })) || []
        }
        if (questionType == enum_questionType.Writing) {
            evaQuestionAnswersFinal = [
                {
                    id: 0,
                    code: "string",
                    name: "string",
                    concurrencyStamp: "string",
                    isEnabled: true,
                    type: questionType,
                    density: 100,
                    content: answerWrittingState[0]?.answer,
                    descriptionContent: answerWrittingState[0]?.explain,
                }
            ]
        }
        if (questionType == enum_questionType.PlankText) {

            if (!utils_list_isFieldUnique(answerPlankTextState[0], "index")) {
                notifications.show({
                    message: "Vị trí lựa chọn không được trùng!",
                    color: "red"
                })
                return false
            }

            if (answerPlankTextState[0]?.length > 0 && !utils_list_isTotalEqual(answerPlankTextState[0] || [], "density", 100)) {
                notificationNotEqual100()
                return false
            }

            evaQuestionAnswersFinal = answerPlankTextState[0]?.map(item => ({
                id: 0,
                code: "string",
                name: "string",
                concurrencyStamp: "string",
                isEnabled: true,
                type: questionType,
                index: item.index,
                density: item.density,
                content: item.content,
                descriptionContent: item.explain,
            })) || []
        }

        if (questionType == enum_questionType.Link) {
            if (answerLinkState[0]?.length > 0 && !utils_list_isTotalEqual(answerLinkState[0] || [], "density", 100)) {
                notificationNotEqual100()
                return false
            }
            const leftChoice = answerLinkState[0]?.map(item => ({
                id: 0,
                code: "string",
                name: "string",
                index: item.index,
                concurrencyStamp: "string",
                isEnabled: true,
                type: 1,
                density: item.density,
                content: item.content,
            })) || []

            const rightChoice = answerLinkState[0]?.map(item => ({
                id: 0,
                code: "string",
                name: "string",
                concurrencyStamp: "string",
                index: item.index,
                isEnabled: true,
                type: 2,
                density: 0,//Tạm thời để 0,
                // density: item.density,
                content: item.explain,
            })) || []
            evaQuestionAnswersFinal = [...leftChoice, ...rightChoice]
        }



        if (values) {
            return questionService.update({
                ...formData,
                content: formData.content,
                code: formData.code,
                name: "string",
                evaQuestionTypeId: questionType, // loại câu hỏi
                evaSubjectId: filterSubjectStore.state.subject?.id, // Môn học
                evaQuestionAnswers: evaQuestionAnswersFinal,
                evaRubricsId: questionType == enum_questionType.TextEditorRubrics ? parseInt(rubricIdState[0]!) : undefined
            })
        }
        return questionService.create({
            ...formData,
            content: formData.content,
            code: formData.code,
            name: "string",
            evaQuestionTypeId: questionType, // loại câu hỏi
            evaSubjectId: filterSubjectStore.state.subject?.id, // Môn học
            evaQuestionAnswers: evaQuestionAnswersFinal,
            evaRubricsId: questionType == enum_questionType.TextEditorRubrics ? parseInt(rubricIdState[0]!) : undefined
        })
    }

    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
        setQuestionType(values.evaQuestionTypeId!)
        if (values.evaQuestionTypeId == enum_questionType.SingleChoice) {
            answerSingleState[1](values.evaQuestionAnswers?.map(item => ({
                id: item.id,
                content: item.content,
                density: item.density,
                explain: item.descriptionContent,
                isCorrect: item.density == 100 ? true : false
            })) || [])
        }
        if (values.evaQuestionTypeId == enum_questionType.MultipleChoice) {
            answerMultipleState[1](values.evaQuestionAnswers?.map(item => ({
                id: item.id,
                content: item.content,
                density: item.density,
                explain: item.descriptionContent,
                isCorrect: item.density! > 0 ? true : false
            })) || [])
        }
        if (values.evaQuestionTypeId == enum_questionType.TextEditor) {
            answerEditorState[1](values.evaQuestionAnswers?.map(item => ({
                id: item.id,
                content: item.content,
                density: item.density,
            })) || [])
        }

        if (values.evaQuestionTypeId == enum_questionType.PlankText) {
            answerPlankTextState[1](values.evaQuestionAnswers?.map(item => ({
                id: item.id,
                content: item.content,
                density: item.density,
                explain: item.descriptionContent,
                index: item.index
            })) || [])
        }
        if (values.evaQuestionTypeId == enum_questionType.Link) {
            answerLinkState[1](values.evaQuestionAnswers?.map(item => ({
                id: item.id,
                content: item.content,
                density: item.density,
                explain: item.descriptionContent,
            })) || [])
        }
        if (values.evaQuestionTypeId == enum_questionType.Writing) {
            answerWrittingState[1]({
                id: values.evaQuestionAnswers?.[0]?.id,
                answer: values.evaQuestionAnswers?.[0]?.content,
                explain: values.evaQuestionAnswers?.[0]?.descriptionContent,
            })
        }

        rubricIdState[1](values.evaRubricsId?.toString())
    }, [values])



    return (
        <CustomButtonCreateUpdate
            isUpdate={!!values}
            form={form}
            onSubmit={handleSubmit}
            onSuccess={resetValue}
            modalProps={{
                title: "Chi tiết câu hỏi",
                size: "80%",
            }}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <MyTextInput label="Mã câu hỏi" withAsterisk readOnly={!!values}  {...form.getInputProps("code")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <MySelect
                        withAsterisk
                        data={utils_converter_mapEnumToSelectData(enum_questionType, enumLabel_questionType)}
                        label="Loại câu hỏi"
                        readOnly={!!values}
                        value={questionType?.toString()}
                        onChange={(value) => {
                            setQuestionType(parseInt(value!));
                        }}

                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MySelectFromAPI label="Chương"
                        queryKey={["topics", filterSubjectStore.state.subject?.id]}
                        axiosFn={() => topicService.GetTopicBySubjectId({ subjectId: filterSubjectStore.state.subject?.id })}
                        value={form.getValues().evaTopicId?.toString()}
                        onChange={(val) => {
                            form.setFieldValue("evaTopicId", parseInt(val!))
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 3 }}>
                    <MySelectFromAPI
                        label="Độ khó"
                        queryKey={["difficulties", filterSubjectStore.state.subject?.evaDifficultyId!]}
                        axiosFn={() => {
                            return difficultyDetailService.GetDificultyDetailsByDifficultyId({ difficultyId: filterSubjectStore.state.subject?.evaDifficultyId! })
                        }}
                        value={form.getValues().evaDifficultyDetailId?.toString()}
                        onChange={(val) => {
                            form.setFieldValue("evaDifficultyDetailId", parseInt(val!))
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <MySelectFromAPI
                        label="Nhận thức"
                        queryKey={["cognitions"]}
                        axiosFn={cognitionService.getAll}
                        value={form.getValues().evaCognitionId?.toString()}
                        onChange={(val) => {
                            form.setFieldValue("evaCognitionId", parseInt(val!))
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MySelectFromAPI
                        label="CLO môn học"
                        queryKey={["closubject", filterSubjectStore.state.subject?.id]}
                        axiosFn={() => CLOService.GetCLOsBySubjectId(filterSubjectStore.state.subject?.id!)}
                        value={form.getValues().evaCloId?.toString()}
                        onChange={(val) => {
                            form.setFieldValue("evaCloId", parseInt(val!))
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <MyRichTextEditor
                        inputWrapperProps={{ label: "Nội dung câu hỏi" }}
                        value={form.getValues().content}
                        onBlur={form.getInputProps("content").onChange}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    {questionType == enum_questionType.SingleChoice && (
                        <MyQuestionChoice
                            value={answerSingleState[0]}
                            onChange={answerSingleState[1]}
                        />
                    )}
                    {questionType == enum_questionType.MultipleChoice && (
                        <MyQuestionChoice
                            isMultipleChoice
                            value={answerMultipleState[0]}
                            onChange={answerMultipleState[1]}
                        />
                    )}
                    {questionType == enum_questionType.TextEditor && (
                        <MyQuestionEditor
                            value={answerEditorState[0]}
                            onChange={answerEditorState[1]}
                        />
                    )}
                    {questionType == enum_questionType.Writing && (
                        <MyQuestionWritting
                            value={answerWrittingState[0]}
                            onChange={answerWrittingState[1]}
                        />
                    )}
                    {questionType == enum_questionType.PlankText && (
                        <MyQuestionPlankText
                            value={answerPlankTextState[0]}
                            onChange={answerPlankTextState[1]}
                        />
                    )}
                    {questionType == enum_questionType.TextEditorRubrics && (
                        <FeatQuestionEditorRubric value={rubricIdState[0]} onChange={rubricIdState[1]} />
                    )}

                    {questionType == enum_questionType.Link && (
                        <MyQuestionLink value={answerLinkState[0]} onChange={answerLinkState[1]} />
                    )}
                </Grid.Col>
            </Grid>
        </CustomButtonCreateUpdate>
    )
}
