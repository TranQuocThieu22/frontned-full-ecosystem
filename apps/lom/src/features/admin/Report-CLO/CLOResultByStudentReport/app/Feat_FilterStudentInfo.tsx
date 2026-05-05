import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import Shared_StudentFilterForReport from "@/components/domain/Filter/Shared_StudentFilterForReport"
import { enum_formulaType } from "@/data/enum/enum_formulaType"
import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { useStore_CLOResultByStudentReport } from "./useStore_CLOResultByStudentReport"

export default function Feat_FilterStudentInfo() {
    const store = useStore_CLOResultByStudentReport()
    const studentIdState = useState<string | null>()
    const subjectIdState = useState<string | null>()
    const subjectState = useState<COECourseSectionStudent>()
    const formulaTypeIdState = useState<string | null>(enum_formulaType.attendace.toString())

    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

    const studentInfoQuery = useCustomReactQuery({
        queryKey: ['studentInfo', studentIdState[0]],
        axiosFn: () => {
            return service_account.getCOEStudentInfo({ studentId: parseInt(studentIdState[0]!) })
        },
        options: {
            enabled: !!studentIdState[0],
            refetchOnWindowFocus: false
        }
    })
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
    useEffect(() => {
        if (!studentInfoQuery.data) return
        const studentInfo = studentInfoQuery.data
        store.setProperty("subjectName", subjectState[0]?.coeCourseSection?.coeGradeSubject?.coeSubject?.name)
        store.setProperty("studentName", studentInfo.fullName)
        store.setProperty("studentId", parseInt(studentIdState[0]!))
        store.setProperty("subjectId", subjectState[0]?.coeCourseSection?.coeGradeSubject?.id)

        store.setProperty("studentCode", studentInfo.code)
        store.setProperty("gradeName", studentInfo.coeGradeName)
    }, [studentInfoQuery.data, formulaTypeIdState[0], subjectIdState[0]])

    return (
        <Shared_StudentFilterForReport
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
                },
                value: subjectIdState[0],
                onChange: subjectIdState[1],
                setObjectData: subjectState[1]

            }}
            formulaTypeProps={{
                value: formulaTypeIdState[0],
                onChange: formulaTypeIdState[1]
            }}
            isIncludeFormulaType={false}
        />
    )
}
