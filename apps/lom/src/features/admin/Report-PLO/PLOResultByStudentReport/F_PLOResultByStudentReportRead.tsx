import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import { canPrintStudent } from "@/features/auth/PageAuthorization/PLO-report-result-single-student.auth"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Divider, Flex, Group, Paper } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { GraduationCap } from "lucide-react"
import { useState } from "react"
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces"
import PLOReport from "./PLOReport"

export default function F_PLOResultByStudentReportRead() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const [studentId, setStudentId] = useState<number | undefined | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

    const [selectedStudentData, setSelectedStudentData] = useState<IStudentInfoViewModel>()

    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);


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
        queryKey: ['studentInfo', studentId],
        axiosFn: () => {
            return service_account.getCOEStudentInfo({ studentId: studentId! })
        },
        options: {
            enabled: !!studentId
        }
    })

    const StudentReportData = useCustomReactQuery({
        queryKey: ['studentReport', studentId],
        axiosFn: async () => {
            return service_COECourseSectionStudent.StudentReports({
                param: `studentId=${studentId}`
            })
        },
        options: {
            refetchOnWindowFocus: false,
            enabled: !!(studentId && allStudents.isSuccess)
        }
    })

    // Set default semester when semester data loads
    return (
        <Flex direction={"column"}>
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
                    setStudentId(value?.id || 0)
                }}
                searchValue={studentSearchInput}
                onSearchChange={setStudentSearchInput}
                label="Mã sinh viên"
                placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
            /> */}
            <CustomSelect label="Mã sinh viên" />
            <Divider />
            <Paper p={'md'}>
                <CustomFlexIconTitle icon={<GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                    Thông tin chương trình
                </CustomFlexIconTitle>
                <Group grow>
                    <CustomTextInput
                        label="Chương trình"
                        placeholder="Sinh viên chưa thuộc chương trình!"
                        readOnly
                        defaultValue={studentInfoQuery.data?.coeProgramName}
                    />
                    <CustomTextInput
                        label="Khóa"
                        placeholder="Sinh viên chưa thuộc Khóa!"
                        readOnly
                        defaultValue={studentInfoQuery.data?.coeGradeName}
                    />
                    <CustomTextInput
                        label="Lớp"
                        placeholder="Sinh viên chưa thuộc lớp!"
                        readOnly
                        defaultValue={studentInfoQuery.data?.className}
                    />
                </Group>
                <Divider />
                <CustomFlexRow mt={10}>
                    {canPrintStudent(userStore, userPermissionStore) &&
                        <PLOReport
                            StudentReportData={StudentReportData.data ?? []}
                            studentInfoQuery={studentInfoQuery.data || {}}
                            selectedStudentData={selectedStudentData || {}}
                        />}
                </CustomFlexRow>
            </Paper>
        </Flex>
    )
}
