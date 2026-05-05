import { Button, Grid, Paper, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MyButtonModal, MyFlexColumn, MyFlexRow } from 'aq-fe-framework/components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { StudentGradeEntry } from '../PendingQuestionList';
import SpeechRubricGrading from './SpeechRubricGrading';
import EssaySuggestionGrading from './SpeechSuggestionGrading';

export default function SpeechGradingExam({ QuestionData }: { QuestionData: StudentGradeEntry }) {
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

                        <Player

                        />
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
                    <SpeechRubricGrading />
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
const Player = () => (
    <AudioPlayer
        autoPlay
        src={'/Rick-roll.mp3'}
        onPlay={e => console.log("onPlay")}
    // other props here
    />
);
