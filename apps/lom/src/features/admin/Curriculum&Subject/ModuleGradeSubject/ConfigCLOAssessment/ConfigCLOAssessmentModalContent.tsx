"use client"
import { Divider, Flex, Group, Tabs, Text } from '@mantine/core';
import { IconCategory, IconListCheck, IconListDetails, IconMatrix, IconSubtask, IconTable, IconTargetArrow } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useS_ConfigCLOAssessment } from './Hooks/useS_ConfigCLOAssessment';
import { IGradeSubject } from './Interfaces/Interfaces';
import GSAssessmentTable from './TabAssessment/GSAssessmentTable';
import TabAssessmentByToolLayout from './TabAssessmentByTool/TabAssessmentByToolLayout';
import CGTable from './TabCG/CGTable';
import CLOTable from './TabCLO/CLOTable';
import TabCLOMatrix_Layout from './TabCLOMatrix/TabCLOMatrix_Layout';
import GSFormulaTable from './TabFormula/GSFormulaTable';
import TabGSMethodLayout from './TabMethod/TabGSMethodLayout';
export enum GradeFormulaType {
    "Trung bình cộng" = 1,
    "Tỷ trọng theo số tín chỉ" = 2,
    "Tỷ trọng theo mức độ nhận thức MIT" = 3,
    "Tỷ trọng theo thang Likert (MRI)" = 4,
    "Trọng số CLO thành phần " = 5
}
export default function ConfigCLOAssessmentModalContent(
    { gradeSubjectValues, programData, gradeData }: { gradeSubjectValues: IGradeSubject, programData: any, gradeData: any }
) {
    const store = useS_ConfigCLOAssessment()
    useEffect(() => {
        if (programData == undefined || gradeSubjectValues == undefined) return
        store.setProperty("coeSubjectName", gradeSubjectValues.coeSubject?.name)
        store.setProperty("programName", programData?.name)
        store.setProperty("gradeName", gradeSubjectValues.coeGrade?.name)
    }, [programData, gradeSubjectValues])

    const [activeTab, setActiveTab] = useState<string | null>('ca_cg');

    return (
        <>
            <Group gap="36">
                <Text><strong>Khóa: </strong>{gradeSubjectValues.coeGrade?.name}</Text>
                <Text><strong>Chương trình: </strong>{programData?.name}</Text>
                <Text><strong>Môn học: </strong>{gradeSubjectValues.coeSubject?.name}</Text>
                <Text><strong>Công thức chia CLO: </strong>{gradeData?.formulaType ? GradeFormulaType[gradeData.formulaType] : "Chưa thực hiện cấu hình công thức"}</Text>
            </Group>
            {/* ca = course assessment */}
            <Tabs
                orientation="vertical"
                color="cyan" variant="pills" radius="xs" value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="ca_cg" leftSection={<IconTargetArrow />}>
                        Mục tiêu môn học CG
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_clo" leftSection={<IconListCheck />}>
                        Chuẩn đầu ra môn học CLO
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_formula" leftSection={<IconCategory />}>
                        Hình thức đánh giá CA
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_assessment" leftSection={<IconSubtask />}>
                        Nội dung đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_method" leftSection={<IconListDetails />}>
                        Phương pháp đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_tool" leftSection={<IconTable />}>
                        Công cụ đánh giá
                    </Tabs.Tab>
                    <Tabs.Tab value="ca_CLOMatrix" leftSection={<IconMatrix />}>
                        Tổng hợp ma trận CLO
                    </Tabs.Tab>
                </Tabs.List>

                <Divider my="0" orientation="vertical" />

                <Tabs.Panel value="ca_cg" w={"90%"}>
                    <Group ml={16} grow>
                        <CGTable isActiveTab={activeTab === "ca_cg"} gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>
                <Tabs.Panel value="ca_clo" w={"90%"}>
                    <Group ml={16} grow>
                        <CLOTable isActiveTab={activeTab === "ca_clo"} gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_formula" w={"90%"}>
                    <Group ml={16} grow>
                        <GSFormulaTable isActiveTab={activeTab === "ca_formula"} gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_assessment" w={"90%"}>
                    <Group ml={16} grow>
                        <GSAssessmentTable isActiveTab={activeTab === "ca_assessment"} gradeSubjectId={gradeSubjectValues.id!} gradeSubjectValues={gradeSubjectValues.coeSubject} programName={programData.name} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_method" w={"90%"}>
                    <Group ml={16} grow>
                        <TabGSMethodLayout isActiveTab={activeTab === "ca_method"} gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>

                <Tabs.Panel value="ca_tool" w={"90%"}>
                    <Flex ml={16} gap={16} direction="column">
                        <TabAssessmentByToolLayout isActiveTab={activeTab === "ca_tool"} gradeSubjectId={gradeSubjectValues.id} />
                    </Flex>
                </Tabs.Panel>

                <Tabs.Panel value="ca_CLOMatrix" w={"90%"}>
                    <Group ml={16} grow>
                        <TabCLOMatrix_Layout isActiveTab={activeTab === "ca_CLOMatrix"} gradeSubjectId={gradeSubjectValues.id} />
                    </Group>
                </Tabs.Panel>
            </Tabs>
        </>
    )
}



