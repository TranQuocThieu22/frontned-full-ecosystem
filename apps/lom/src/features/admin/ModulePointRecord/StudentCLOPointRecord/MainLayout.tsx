'use client'

import { service_account } from "@/api/services/service_account"
import { ICOEStudentInfoRes } from "@/api/services/service_COEReport"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { Card, Divider, Group, Text } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { IGSAssessment } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigCLOAssessment/TabAssessment/Interfaces"
import { IGSFormula } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigCLOAssessment/TabFormula/Interfaces"
import CLOPointRecordPerStudentTable from "./CLOPointRecordPerStudentTable"
import { ASSESSMENT_QUESTION_TYPE, formulaType } from "./Interfaces/Enum"
import { ICourseSetionStudentInfoViewModel } from "./Interfaces/Interfaces"

export default function MainLayout() {
    const studentIdState = useState<number | undefined>()
    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);

    const courseSectionStudentIdState = useState<number | undefined | null>(null)
    const courseSectionIdState = useState<number | undefined | null>(null)

    const gradeSubjectIdState = useState<number | undefined | null>(null)

    const formulaIdState = useState<number | null>(null)
    // const formulaValues = useState<IGSFormula>()

    const assessmentIdState = useState<number | null>(null)
    const assessmentValues = useState<IGSAssessment>()

    const allStudents = useCustomReactQuery({
        queryKey: ["students", debouncedStudentSearch, paginationState[0].pageIndex, paginationState[0].pageSize],
        axiosFn: () => service_account.getStudentCOE({
            paging: {
                pageNumber: paginationState[0].pageIndex + 1,
                pageSize: paginationState[0].pageSize,
            },
            codeOrName: debouncedStudentSearch,
        }),
        options: {
            placeholderData: (previousData) => previousData
        }
    })

    const allCourseSectionByStudent = useQuery<ICourseSetionStudentInfoViewModel[]>({
        queryKey: [`CourseSectionByStudent${studentIdState[0]}`],
        queryFn: async () => {
            courseSectionStudentIdState[1](null)
            gradeSubjectIdState[1](null)
            if (studentIdState[0] === null) return [];
            const res = await baseAxios.get(`/COECourseSectionStudent/GetByStudent?studentId=${studentIdState[0]}`)
            courseSectionStudentIdState[1](res.data.data[0].id)
            gradeSubjectIdState[1](res.data.data[0].coeCourseSection.coeGradeSubject.id ?? null)
            courseSectionIdState[1](res.data.data[0].coeCourseSection.id ?? null)
            return res.data.data
        },
        refetchOnWindowFocus: false,
        enabled: !!studentIdState[0] && allStudents.isSuccess
    })

    const allGSFormula = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaByGS`, gradeSubjectIdState[0]],
        queryFn: async () => {
            formulaIdState[1](null)
            assessmentIdState[1](null)
            if (gradeSubjectIdState[0] === null) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectIdState[0]}`);
            formulaIdState[1](response.data.data[0].id)
            return response.data.data || [];
        },
        refetchOnWindowFocus: false
    })

    const allGSAssessmentByGSFormula = useQuery<IGSAssessment[]>({
        queryKey: [`GSAssessmentByGSFormula`, formulaIdState[0]],
        queryFn: async () => {
            assessmentIdState[1](null)
            assessmentValues[1]({} as IGSAssessment)
            if (formulaIdState[0] === null) return [];
            const response = await baseAxios.get(`/COESubjectAssessment/GetAssessmentByFormula?coeFormulaId=${formulaIdState[0]}`)
            let asessmentId = response.data.data[0].coeSubjectAssessments[0].id
            assessmentIdState[1](asessmentId)
            assessmentValues[1](response.data.data[0].coeSubjectAssessments[0])
            return response.data.data[0].coeSubjectAssessments || [];
        },
        refetchOnWindowFocus: false
    })

    const studentInfo = useQuery<ICOEStudentInfoRes>({
        queryKey: [`studentInfo`, studentIdState[0]],
        queryFn: async () => {
            if (studentIdState[0] === null) return [];
            const response = await baseAxios.get(`/Account/COEStudentInfo?studentId=${studentIdState[0]}`)
            return response.data.data || [];
        },
        refetchOnWindowFocus: false
    })

    const handleOnChangeSelectGSAssessment = (GSAssessmentValue: number | null) => {
        assessmentIdState[1](GSAssessmentValue)
        assessmentValues[1](allGSAssessmentByGSFormula.data?.find(item => item.id === GSAssessmentValue))
    }

    const handleOnChangeSelectCourseSection = (courseSectionStudentValue: number | null) => {
        courseSectionStudentIdState[1](courseSectionStudentValue ?? null)
        let courseSectionStudentInfo = allCourseSectionByStudent.data?.find(item => item.id === courseSectionStudentValue)
        courseSectionIdState[1](courseSectionStudentInfo?.coeCourseSection?.id ?? null)
        gradeSubjectIdState[1](courseSectionStudentInfo?.coeCourseSection?.coeGradeSubject?.id ?? null)
    }

    return (
        <>
            <Card>
                <Group>
                    {/* <CustomSearchableSelect
                        w={'30%'}

                        query={allStudents}
                        value={selectedStudent}
                        config={{
                            getValue: (student) => student.id?.toString() ?? '',
                            getLabel: (student) => `${student.code} - ${student.fullName}`,
                        }}
                        onChange={(value) => {
                            setSelectedStudent(value)
                            studentIdState[1](value?.id || 0)
                        }}
                        searchValue={studentSearchInput}
                        onSearchChange={setStudentSearchInput}
                        label="Mã sinh viên"
                        placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                    /> */}
                    <CustomSelect label="Mã sinh viên" />
                    {/* <Select
                        searchable
                        w={{ base: '100%', md: '20%', }}
                        placeholder={"Chọn mã sinh viên"}
                        label="Mã sinh viên"
                        data={allStudents.data?.map((item: IStudentInfoViewModel) => ({
                            value: item.id!.toString(),
                            label: item.code === null ? 'Dữ liệu mã sinh viên bị lỗi hoặc không có' : `${item.code} - ${item.fullName}`
                        })) || []}
                        value={studentIdState[0]?.toString()}
                        onChange={(value, option) => {
                            studentIdState[1](parseInt(value!))
                        }}
                    /> */}
                    <Group gap="32" mt={28} mb={12}>
                        <Text><strong>Họ tên: </strong>{studentInfo.data?.fullName ?? "Chưa có dữ liệu"}</Text>
                        <Text><strong>Lớp: </strong>{studentInfo.data?.className ?? "chưa có dữ liệu mã lớp"}</Text>
                        <Text><strong>Chương trình: </strong>{studentInfo.data?.coeProgramName ?? "chưa có dữ liệu chương trình"}</Text>
                    </Group>
                </Group>
                <CustomSelect
                    data={allCourseSectionByStudent.data?.map((item: ICourseSetionStudentInfoViewModel) => ({
                        value: item.id!.toString(),
                        label: item.coeCourseSection?.coeGradeSubject?.coeSubject === null ? 'Dữ liệu môn học bị lỗi hoặc không có'
                            :
                            item.coeCourseSection?.coeGradeSubject?.coeSubject.name === null ? 'Dữ liệu tên môn học bị lỗi hoặc không có'
                                : `${item.coeCourseSection?.coeGradeSubject?.coeSubject.code} - ${item.coeCourseSection?.coeGradeSubject?.coeSubject.name}`
                    })) || []}
                    value={courseSectionStudentIdState[0] === null ? null : courseSectionStudentIdState[0]?.toString()}
                    onChange={(value, option) => {
                        handleOnChangeSelectCourseSection(value === null ? null : parseInt(value))
                    }}
                    // isLoading={allCourseSectionByStudent.isFetching}
                    // isError={allCourseSectionByStudent.isError}
                    w={{ base: '100%', md: '30%', }}
                    placeholder={"Chọn môn học"}
                    label="Môn học"
                />
                <Group mt={14}>
                    <CustomSelect
                        data={allGSFormula.data?.map((item: IGSFormula) => (
                            {
                                value: item.id!.toString(),
                                label: formulaType[item.formulaType!] ?? 'Không có dữ liệu'
                            }
                        )) || []}
                        value={formulaIdState[0] === null ? null : formulaIdState[0].toString()}
                        onChange={(value, option) => {
                            formulaIdState[1](parseInt(value!))
                        }}
                        isLoading={allGSFormula.isFetching}
                        isError={allGSFormula.isError}
                        w={{ base: '100%', md: '32%' }}
                        placeholder={"Chọn hình thức đánh giá CA"}
                        label="Hình thức đánh giá CA"
                    />
                    <CustomSelect
                        data={allGSAssessmentByGSFormula.data?.map((item: IGSAssessment) => ({
                            value: item.id!.toString(),
                            label: item.content === null ? 'Không có dữ liệu nội dung' : item.content!
                        })) || []}
                        value={assessmentIdState[0] === null ? null : assessmentIdState[0]?.toString()}
                        onChange={(value, option) => {
                            handleOnChangeSelectGSAssessment(value === null ? null : parseInt(value))
                        }}
                        isLoading={allGSAssessmentByGSFormula.isFetching}
                        isError={allGSAssessmentByGSFormula.isError}
                        w={{ base: '100%', md: '32%' }}
                        placeholder={"Chọn nội dung đánh giá"}
                        label="Nội dung đánh giá"
                    />
                    <CustomSelect
                        w={{ base: '100%', md: '32%' }}
                        placeholder={"Chọn phương pháp đánh giá"}
                        label="Phương pháp đánh giá"
                        data={
                            assessmentValues[0] && assessmentValues[0].questionType &&
                            [
                                {
                                    value: assessmentValues[0].questionType?.toString(),
                                    label: ASSESSMENT_QUESTION_TYPE[assessmentValues[0].questionType] ?? 'Không có dữ liệu'
                                },
                            ] || []
                        }
                        value={assessmentValues[0] && assessmentValues[0].questionType ? assessmentValues[0].questionType.toString() : null}
                    />
                </Group>
            </Card>
            <Divider my={12} />
            <CLOPointRecordPerStudentTable
                GSAssessmentId={assessmentIdState[0]}
                GSAssessmentInfo={assessmentValues[0]}
                studentId={studentIdState[0]}
                courseSectionId={courseSectionIdState[0]}
                courseSectionStudentId={courseSectionStudentIdState[0]}
            />
        </>
    )
}
