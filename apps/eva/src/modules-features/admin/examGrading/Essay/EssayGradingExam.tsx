import { Button, Grid, Paper, Table, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MyButtonModal, MyFlexColumn, MyFlexRow } from 'aq-fe-framework/components';
import { StudentGradeEntry } from '../PendingQuestionList';
import EssayRubricGrading from './EssayRubricGrading';
import EssaySuggestionGrading from './EssaySuggestionGrading';

export default function EssayGradingExam({ QuestionData }: { QuestionData: StudentGradeEntry }) {
    const disc = useDisclosure()

    const currentScore = 0.5; // This should come from your data


    return (
        <MyButtonModal
            modalSize={"80%"}
            disclosure={disc}
            title={'Chi tiết loại câu hỏi'}
            label="Chấm bài"
        >
            <MyFlexColumn>
                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, md: 12, lg: 10 }}>
                        <Table withColumnBorders withRowBorders striped highlightOnHover>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td><Text fw={700}>Thí sinh:</Text></Table.Td>
                                    <Table.Td>{QuestionData.fullName}</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td><Text fw={700}>Nội dung câu hỏi:</Text></Table.Td>
                                    <Table.Td>{QuestionData.question}</Table.Td>
                                </Table.Tr>

                            </Table.Tbody>
                        </Table>

                        <Textarea label='Nội dung câu trả lời'
                            readOnly
                            autosize
                            minRows={4}
                            maxRows={8}
                            defaultValue={`Từ khóa chọn trong SQL là query`}>
                        </Textarea>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 12, lg: 2 }}>
                        {/* Score Display */}
                        <Paper shadow="sm" p="md" radius="md" withBorder h="100%">
                            <MyFlexColumn align="center" justify="center" h="100%" gap="xs">
                                <Text size="lg" c="dimmed" fw={500}>ĐIỂM</Text>
                                <Text size="xl" fw={500} c="blue">
                                    {currentScore}
                                </Text>
                                <Text size="sm" c="dimmed">Điểm tối đa: 1</Text>
                            </MyFlexColumn>
                        </Paper>
                    </Grid.Col>
                </Grid>
                {QuestionData.gradingType === 1 ? (
                    <EssaySuggestionGrading />
                ) : (
                    <EssayRubricGrading />
                )}
                <MyFlexRow align={"center"} justify="center" gap="xs" mt="md">
                    <Button bg={'green'}>Quay lại</Button>
                    <Button bg={'green'}>Lưu</Button>
                    <Button bg={'green'}>Tiếp tục</Button>
                </MyFlexRow>
            </MyFlexColumn>
        </MyButtonModal>
    )
}
