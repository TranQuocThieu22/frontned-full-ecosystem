import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import Shared_StudentFilterForReport from "@/components/domain/Filter/Shared_StudentFilterForReport"
import { enum_formulaType } from "@/data/enum/enum_formulaType"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { useStore_CLOScoreReportByGrade } from "./useStore_CLOScoreReportByGrade"

export default function Feat_FilterStudentInfo() {
    const store = useStore_CLOScoreReportByGrade()
    const studentIdState = useState<string | null>()
    const formulaTypeIdState = useState<string | null>(enum_formulaType.attendace.toString())
    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

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

    const studentInfoQuery = useCustomReactQuery({
        queryKey: ['studentInfo', studentIdState[0]],
        axiosFn: () => {
            return service_account.getCOEStudentInfo({ studentId: parseInt(studentIdState[0]!) })
        },
        options: {
            enabled: !!studentIdState[0]
        }
    })

    useEffect(() => {
        if (!studentInfoQuery.data) return
        const studentInfo = studentInfoQuery.data
        store.setProperty("studentId", parseInt(studentIdState[0]!))
        store.setProperty("studentName", studentInfo.fullName)
        store.setProperty("class", studentInfo.className)
        store.setProperty("dateOfBirth", studentInfo.dateOfBirth)
        store.setProperty("gender", studentInfo.gender)
        store.setProperty("program", studentInfo.coeProgramName)
        store.setProperty("grade", studentInfo.coeGradeName)
    }, [studentInfoQuery.data, formulaTypeIdState[0]])

    return (
        <Shared_StudentFilterForReport
            isIncludeSubject={false}
            studentSelectProps={{
                query: allStudents,
                selectedStudent: selectedStudent,
                setSelectedStudent: setSelectedStudent,
                setStudentSearchInput: setStudentSearchInput,
                studentSearchInput: studentSearchInput,
                studentIdState: studentIdState[0],
                setStudentIdState: studentIdState[1]
            }}
            gradeName={studentInfoQuery.data?.coeGradeName}
            programName={studentInfoQuery.data?.coeProgramName}
            className={studentInfoQuery.data?.className}
            subjectSelectProps={{
                queryKey: ['subject', 'byStudent', studentIdState[0]],
                axiosFn: () => service_COECourseSectionStudent.getByStudent({ studentId: parseInt(studentIdState[0]!) }),
                getOptionLabel: (opt) => {
                    if (opt.coeCourseSection?.coeGradeSubject?.coeSubject == null) {
                        return "Dữ liệu môn học bị lỗi hoặc không có"
                    }
                    return opt.coeCourseSection?.coeGradeSubject?.coeSubject?.name || ""
                }
            }}
            formulaTypeProps={{
                value: formulaTypeIdState[0],
                onChange: formulaTypeIdState[1]
            }}
        />
    )
}
