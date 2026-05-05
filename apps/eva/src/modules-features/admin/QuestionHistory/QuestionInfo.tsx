import { Flex, Grid, List, Text } from '@mantine/core';
import { MyFieldset } from 'aq-fe-framework/components';

export default function QuestionInfo({ questionData }: { questionData: any }) {
    return (
        <MyFieldset title="Thông tin câu hỏi" mb={20} mt={20}>
            <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <List spacing="xs" size="sm" listStyleType="none" withPadding={false}>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>Mã câu hỏi:</Text>
                                <Text>{questionData.QuestionCode || ''}</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>Độ khó:</Text>
                                <Text>{questionData.Difficulty || ''}</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>Mức độ nhận thức:</Text>
                                <Text>{questionData.CognitiveObjective || ''}</Text>
                            </Flex>
                        </List.Item>
                    </List>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <List spacing="xs" size="sm" listStyleType="none" withPadding={false}>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>Mã chương:</Text>
                                <Text>{questionData.ChapterCode || ''}</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>Loại câu hỏi:</Text>
                                <Text>{questionData.QuestionType || ''}</Text>
                            </Flex>
                        </List.Item>
                        <List.Item>
                            <Flex gap="xs">
                                <Text fw={500}>CLO:</Text>
                                <Text>{questionData.CLO || ''}</Text>
                            </Flex>
                        </List.Item>
                    </List>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <List spacing="xs" size="sm" listStyleType="none" withPadding={false}>
                        <List.Item>
                            <Flex gap="xs" wrap="wrap">
                                <Text fw={500}>Nội dung câu hỏi:</Text>
                                <Text>{questionData.QuestionContent || ''}</Text>
                            </Flex>
                        </List.Item>
                    </List>
                </Grid.Col>
            </Grid>
        </MyFieldset>
    );
}
