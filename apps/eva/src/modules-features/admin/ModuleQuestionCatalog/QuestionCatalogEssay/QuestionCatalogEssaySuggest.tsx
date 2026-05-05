import { ActionIcon, Flex, Group, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { MyActionIconDelete, MyButton, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { useState } from "react";
import { QuestionCatalogEssaySuggestViewModel } from "./interfaces/QuestionCatalogEssayViewModel";

interface Props {
    data?: QuestionCatalogEssaySuggestViewModel[]
}

const removeHtmlTags = (str: string): string => str.replace(/<[^>]*>/g, '');

export default function QuestionCatalogEssaySuggest({ data }: Props) {
    const [answers, setAnswers] = useState<QuestionCatalogEssaySuggestViewModel[]>(data || []);
    const [newAnswer, setNewAnswer] = useState<QuestionCatalogEssaySuggestViewModel>({
        id: 0,
        name: '',
        weight: 0
    });

    const handleChangeNewAnswer = (field: keyof QuestionCatalogEssaySuggestViewModel, value: string | number) => {
        setNewAnswer(prev => ({ ...prev, [field]: value }));
    };

    const handleAddAnswer = () => {
        if (!newAnswer.name.trim()) return;

        setAnswers(prev => [...prev, { ...newAnswer, id: prev.length + 1 }]);
        setNewAnswer({
            id: 0,
            name: '',
            weight: 0
        });
    };

    const handleDeleteAnswer = (id: number) => {
        setAnswers(prev => prev.filter(answer => answer.id !== id));
    };

    const renderAnswerRow = (answer: QuestionCatalogEssaySuggestViewModel, index: number) => {
        return (
            <Table.Tr key={answer.id}>
                <Table.Td>
                    <MyTextInput
                        value={removeHtmlTags(answer.name)}
                        onChange={(e) => { }}
                    />
                </Table.Td>
                <Table.Td>
                    <MyTextInput
                        value={`${answer.weight}%`}
                        onChange={(e) => { }}
                    />
                </Table.Td>
                <Table.Td>
                    <Flex gap="xs">
                        <ActionIcon color="yellow">
                            <IconEdit />
                        </ActionIcon>
                        <MyActionIconDelete
                            onSubmit={() => handleDeleteAnswer(answer.id)}
                            contextData={answer.name}
                        />
                    </Flex>
                </Table.Td>
            </Table.Tr>
        );
    };

    return (
        <Group>
            <Table>
                <Table.Thead>
                    {/* <Table.Tr>
                        <Table.Th>Các tiêu chí</Table.Th>
                        <Table.Th style={{ width: '100px' }}>Tỷ trọng</Table.Th>
                        <Table.Th style={{ width: '100px' }}></Table.Th>
                    </Table.Tr> */}
                </Table.Thead>
                <Table.Tbody>
                    {answers?.map((answer, index) => renderAnswerRow(answer, index))}
                </Table.Tbody>
            </Table>

            <Flex direction="column" w={'100%'} gap="md">
                <MyTextEditor
                    label="Nội dung tiêu chí"
                    contentHeight="lg"
                    value={newAnswer.name}
                    onChange={(value: string) => handleChangeNewAnswer('name', value)}
                />
                <Flex justify="flex-end">
                    <MyButton
                        color="green"
                        w={'fit-content'}
                        leftSection={<></>}
                        onClick={handleAddAnswer}
                    >
                        Thêm tiêu chí
                    </MyButton>
                </Flex>
            </Flex>
        </Group>
    );
}
