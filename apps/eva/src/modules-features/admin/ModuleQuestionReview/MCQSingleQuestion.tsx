import { Switch, Table } from "@mantine/core";
import { MyFieldset, MyTextInput } from "aq-fe-framework/components";
import { useState } from "react";

interface IAnswerOptionViewModel {
    text?: string;
    isCorrect?: boolean;
    weight?: string;
    analysis?: string;
}

export default function MCQSingleQuestion() {
    const [answers, setAnswers] = useState<IAnswerOptionViewModel[]>([
        {
            text: "Delete",
            isCorrect: false,
            weight: "0%",
            analysis: "Đây là từ khóa xóa"
        },
        {
            text: "Order by",
            isCorrect: false,
            weight: "0%",
            analysis: "Đây là từ khóa sắp xếp"
        },
        {
            text: "Group by",
            isCorrect: false,
            weight: "0%",
            analysis: "Đây là từ khóa nhóm"
        },
        {
            text: "Select",
            isCorrect: true,
            weight: "100%",
            analysis: "Đây là từ khóa truy vấn"
        }
    ]);

    const handleChangeAnswer = (index: number, field: keyof IAnswerOptionViewModel, value: string | boolean) => {
        const newAnswers = [...answers];

        // Nếu đang thay đổi trường isCorrect và giá trị là true
        if (field === 'isCorrect' && value === true) {
            // Đặt tất cả các đáp án khác thành false
            newAnswers.forEach((answer, i) => {
                if (i !== index) {
                    answer.isCorrect = false;
                }
            });
        }

        newAnswers[index] = { ...newAnswers[index], [field]: value };
        setAnswers(newAnswers);
    }

    return (
        <MyFieldset title="Danh sách lựa chọn">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Các lựa chọn</Table.Th>
                        <Table.Th style={{ width: '160px' }}>Đáp án</Table.Th>
                        <Table.Th style={{ width: '100px' }}>Tỷ trọng</Table.Th>
                        <Table.Th>Phân tích đáp án</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {answers.map((answer, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <MyTextInput
                                    value={answer.text}
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
                                    value={answer.weight}
                                    onChange={(e) => handleChangeAnswer(index, 'weight', e.target.value)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <MyTextInput
                                    value={answer.analysis}
                                    onChange={(e) => handleChangeAnswer(index, 'analysis', e.target.value)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </MyFieldset>
    );
}