import Usecase_ExamGeneralInfo from "@/modules/exam/usecase/Usecase_ExamGeneralInfo";
import Usecase_QuestionTable from "@/modules/question/usecase/Usecase_QuestionTable";
import { Modal, Paper, SimpleGrid, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ComponentProps } from "react";

interface Props {
    disclosure: ReturnType<typeof useDisclosure>
    questionBankProps: ComponentProps<typeof Usecase_QuestionTable>
    questionSelectProps: ComponentProps<typeof Usecase_QuestionTable>
    generalInfoProps: ComponentProps<typeof Usecase_ExamGeneralInfo>
}

export default function Usecase_ExamCreateUpdateModal({
    disclosure,
    questionBankProps,
    questionSelectProps,
    generalInfoProps
}: Props) {
    return (
        <Modal
            title="Chi tiết tạo đề chuẩn"
            onClose={disclosure[1].close}
            opened={disclosure[0]}
            fullScreen
        >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Paper p={'md'}>
                    <Tabs defaultValue="questionBank">
                        <Tabs.List>
                            <Tabs.Tab value="questionBank">
                                Ngân hàng câu hỏi
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="questionBank">
                            <Usecase_QuestionTable
                                onSelect={(row) => {
                                    const updated = [...questionSelectProps.data, row.original]
                                    questionSelectProps.setData?.(updated)
                                }}
                                visibleColumnKeys={[
                                    "questionCode",
                                    "questionContent",
                                    "questionType",
                                    "numberOfAnswer",
                                    "topicCode",
                                    "difficulty",
                                    "levelOfAwareness",
                                    "cloCode",
                                ]}
                                {...questionBankProps}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
                <Paper p={'md'}>
                    <Tabs defaultValue="generalInfo">
                        <Tabs.List>
                            <Tabs.Tab value="generalInfo">Thông tin chung</Tabs.Tab>
                            <Tabs.Tab value="questionList">Danh sách câu hỏi</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="generalInfo" p={'md'} >
                            <Usecase_ExamGeneralInfo
                                {...generalInfoProps}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="questionList">
                            <Usecase_QuestionTable
                                onSelectFromFilter={() => {

                                }}
                                visibleTempDelete
                                visibleColumnKeys={[
                                    "questionCode",
                                    "questionContent",
                                    "questionType",
                                    "numberOfAnswer",
                                    "topicCode",
                                    "difficulty",
                                    "levelOfAwareness",
                                    "cloCode",
                                    "point"
                                ]}
                                {...questionSelectProps}
                            />
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
            </SimpleGrid>
        </Modal>
    )
}
