import { examSectionService, IExamSection } from "@/shared/APIs/examSectionService";
import { examService, IExam } from "@/shared/APIs/examService";
import { enum_roundRule, enumLabel_roundRule } from "@/shared/consts/enum/enum_roundRule";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Group, SimpleGrid } from "@mantine/core";
import { IconCalendar, IconFileInvoice } from "@tabler/icons-react";
import { MyInfoBox, MySelectFromAPI } from "aq-fe-framework/core";
import { utils_date_dateToDDMMYYYString, utils_time_getHourMinuteFromString } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import { useS_examPaper } from "./useS_examPaper";

export default function F_examPaper_FilterExamSection() {
    const store = useS_examPaper()
    const examState = useState<IExam>()
    const examSectionState = useState<IExamSection>()

    useEffect(() => {
        if (!examSectionState[0]) return
        store.setProperty("subjectId", examSectionState[0].evaSubjectId?.toString())
    }, [examSectionState[0]])
    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} id="F_examPaper_FilterExamSection">
            <CustomFlexColumn>
                <MySelectFromAPI
                    label={<Group gap={7}><IconCalendar /> Kỳ thi</Group>}
                    axiosFn={examService.getAll}
                    queryKey={['exams']}
                    value={store.state.examId?.toString()}
                    autoSelectFirstItem
                    onChange={(val, options) => store.setProperty("examId", val)}
                    setObjectData={examState[1]}
                />
                <CustomFlexColumn gap={2}>
                    <MyInfoBox
                        data={[
                            { label: "Ngày bắt đầu: ", value: utils_date_dateToDDMMYYYString(examState[0]?.startDate) },
                            { label: "Ngày kết thúc: ", value: utils_date_dateToDDMMYYYString(examState[0]?.endDate) },

                        ]} />
                </CustomFlexColumn>
            </CustomFlexColumn>
            <CustomFlexColumn>
                <MySelectFromAPI
                    label={<Group gap={7}><IconFileInvoice /> Môn thi</Group>}
                    queryKey={['examSection', store.state.examId]}
                    axiosFn={() => examSectionService.getExamSectionsByExamId({ examId: parseInt(store.state.examId!) })}
                    getOptionLabel={(item) => `${item.subjectCode} - ${item.subjectName}`}
                    queryOptions={{
                        enabled: !!store.state.examId
                    }}
                    autoSelectFirstItem
                    value={store.state.examSectionId}
                    onChange={(val, options) => store.setProperty("examSectionId", val)}
                    setObjectData={examSectionState[1]}
                />
                <CustomFlexColumn gap={2}>
                    <MyInfoBox
                        data={[
                            { label: "Ngày thi: ", value: utils_date_dateToDDMMYYYString(examSectionState[0]?.startDate) },
                            { label: "Giờ bắt đầu: ", value: utils_time_getHourMinuteFromString(examSectionState[0]?.startTime) },
                            { label: "Thời gian thi: ", value: examSectionState[0] && `${examSectionState[0]?.duration} phút` },
                            { label: "Quy tắc làm tròn: ", value: enumLabel_roundRule[examSectionState[0]?.roundRule as enum_roundRule] },
                        ]} />
                </CustomFlexColumn>

            </CustomFlexColumn>
        </SimpleGrid>
    )
}
