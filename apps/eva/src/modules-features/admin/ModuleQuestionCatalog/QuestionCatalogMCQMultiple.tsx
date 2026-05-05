import { ActionIcon, Flex, Switch, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { MyActionIconDelete, MyButton, MyFieldset, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { useEffect, useState } from "react";
import { IQuestionCatalogMCQMultipleViewModel } from "./interfaces/QuestionCatalogViewModel";

const DEFAULT_ANSWER: IQuestionCatalogMCQMultipleViewModel = {
    text: "",
    isCorrect: false,
    weight: "0%",
    analysis: ""
};

const removeHtmlTags = (str: string): string => str.replace(/<[^>]*>/g, '');

export default function QuestionCatalogMCQMultiple({ data }: { data?: IQuestionCatalogMCQMultipleViewModel[] }) {
    const [answers, setAnswers] = useState<IQuestionCatalogMCQMultipleViewModel[]>([]);
    const [newAnswer, setNewAnswer] = useState<IQuestionCatalogMCQMultipleViewModel>(DEFAULT_ANSWER);

    useEffect(() => {
        if (data) {
            setAnswers(data);
        }
    }, [data]);

    const handleChangeAnswer = (index: number, field: keyof IQuestionCatalogMCQMultipleViewModel, value: string | boolean) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];

            if (field === 'isCorrect' && typeof value === 'boolean') {
                newAnswers[index] = { ...newAnswers[index], [field]: value };

                // Calculate total correct answers
                const totalCorrect = newAnswers.filter(answer => answer.isCorrect).length;

                // Update weights for all correct answers
                newAnswers.forEach((answer, i) => {
                    if (answer.isCorrect) {
                        answer.weight = `${Math.round(100 / totalCorrect)}%`;
                    } else {
                        answer.weight = "0%";
                    }
                });
            } else {
                newAnswers[index] = { ...newAnswers[index], [field]: value };
            }

            return newAnswers;
        });
    };

    const handleChangeNewAnswer = (field: keyof IQuestionCatalogMCQMultipleViewModel, value: string | boolean) => {
        setNewAnswer(prev => ({ ...prev, [field]: value }));
    };

    const handleAddAnswer = () => {
        if (!newAnswer.text?.trim()) return;

        setAnswers(prev => [...prev, newAnswer]);
        setNewAnswer(DEFAULT_ANSWER);
    };

    const renderAnswerRow = (answer: IQuestionCatalogMCQMultipleViewModel, index: number) => (
        <Table.Tr key={index}>
            <Table.Td>
                <MyTextInput
                    value={removeHtmlTags(answer.text || "")}
                    onChange={(e) => handleChangeAnswer(index, 'text', e.target.value)}
                />
            </Table.Td>
            <Table.Td>
                <Switch
                    label={answer.isCorrect ? "Đáp án đúng" : "Đáp án sai"}
                    checked={answer.isCorrect}
                    onChange={(e) => handleChangeAnswer(index, 'isCorrect', e.target.checked)}
                />
            </Table.Td>
            <Table.Td>
                <MyTextInput
                    value={removeHtmlTags(answer.weight || "")}
                    onChange={(e) => handleChangeAnswer(index, 'weight', e.target.value)}
                />
            </Table.Td>
            <Table.Td>
                <MyTextInput
                    value={removeHtmlTags(answer.analysis || "")}
                    onChange={(e) => handleChangeAnswer(index, 'analysis', e.target.value)}
                />
            </Table.Td>
            <Table.Td>
                <Flex gap="xs">
                    <ActionIcon color="yellow">
                        <IconEdit />
                    </ActionIcon>
                    <MyActionIconDelete
                        onSubmit={() => { }}
                        contextData={answer.text}
                    />
                </Flex>
            </Table.Td>
        </Table.Tr>
    );

    return (
        <MyFieldset title="Danh sách lựa chọn">
            {answers && answers.length > 0 && <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Các lựa chọn</Table.Th>
                        <Table.Th style={{ width: '160px' }}>Đáp án</Table.Th>
                        <Table.Th style={{ width: '100px' }}>Tỷ trọng</Table.Th>
                        <Table.Th>Phân tích đáp án</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {answers.map(renderAnswerRow)}
                </Table.Tbody>
            </Table>}
            <Flex direction="column" gap="md">
                <MyTextEditor
                    label="Lựa chọn"
                    contentHeight="lg"
                    value={newAnswer.text}
                    onChange={(value: string) => handleChangeNewAnswer('text', value)}
                />
                <MyTextEditor
                    label="Phân tích đáp án"
                    contentHeight="lg"
                    value={newAnswer.analysis}
                    onChange={(value: string) => handleChangeNewAnswer('analysis', value)}
                />
                <Flex justify="flex-end">
                    <MyButton
                        color="green"
                        w={'fit-content'}
                        leftSection={<></>}
                        onClick={handleAddAnswer}
                    >
                        Thêm đáp án
                    </MyButton>
                </Flex>
            </Flex>
        </MyFieldset>
    );
}