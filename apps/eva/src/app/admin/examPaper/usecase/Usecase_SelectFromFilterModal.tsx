import Usecase_AwarenessTable from "@/modules/awareness/Usecase_AwarenessTable"
import Usecase_CLOTable from "@/modules/CLO/Usecase_CLOTable"
import Usecase_TopicTable from "@/modules/topic/usecase/Usecase_TopicTable"
import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType"
import { Flex, Modal, NumberInput, Radio, SimpleGrid, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MyFieldset } from "aq-fe-framework/components"
import { MyLabelValueRow, MySelect } from "aq-fe-framework/core"
import { utils_converter_mapEnumToSelectData } from "aq-fe-framework/utils"
import { ComponentProps } from "react"

interface Props {
    disclosure: ReturnType<typeof useDisclosure>
    topicTableProps: ComponentProps<typeof Usecase_TopicTable>
    cloTableProps: ComponentProps<typeof Usecase_CLOTable>
    awarenessTableProps: ComponentProps<typeof Usecase_AwarenessTable>
}

export default function Usecase_SelectFromFilterModal({
    disclosure,
    ...rest
}: Props) {
    return (
        <Modal
            title="Chọn câu hỏi từ bộ lọc"
            onClose={disclosure[1].close} opened={disclosure[0]}
            size={"80%"}
        >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <MySelect label="Loại câu hỏi" data={utils_converter_mapEnumToSelectData(enum_questionType, enumLabel_questionType)} />
                <Flex direction={"column"} gap={'md'}>
                    <MyLabelValueRow value={30} label="Tổng số câu hỏi cần có" />
                    <MyLabelValueRow value={30} label="Tổng số câu hỏi cần có" />
                </Flex>
                <Radio.Group
                    label="Chọn loại ma trận"
                    withAsterisk
                >
                    <Stack mt="xs">
                        <Radio value="topic" label="Chương/ Chủ đề và độ khó" />
                        <Radio value="clo" label="CLO và độ khó" />
                        <Radio value="awareness" label="Mức độ nhận thức và độ khó" />
                    </Stack>
                </Radio.Group>
                <Stack>
                    <NumberInput
                        label="Số câu hỏi cần gán"
                    />
                    <MySelect
                        data={[
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '7',
                            '8',
                            '9',
                            '10'
                        ]}
                        label="Không sử dụng lại câu đã dùng trong (năm)"
                    />
                </Stack>
            </SimpleGrid>
            <MyFieldset title="Ngân hàng câu hỏi">
                <Usecase_TopicTable
                    visibileColumns={[
                        "topicCode",
                        "topicName",
                        "totalQuestion",
                        "difficultyQuestions"
                    ]}
                    {...rest.topicTableProps}
                />
                <Usecase_CLOTable {...rest.cloTableProps} />
                <Usecase_AwarenessTable {...rest.awarenessTableProps} />
            </MyFieldset>
        </Modal>
    )
}
