import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import { service_COESemester } from "@/api/services/service_COESemester"
import { canPrintReportCLOPointOfStudentBySemester } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-semester.auth"
import { COESemester } from "@/interfaces/shared-interfaces/COESemester"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Divider, Flex, Group, Paper, Select, Space } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { BookOpen, GraduationCap, } from "lucide-react"
import { useEffect, useState } from "react"
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces"
import SemesterReportPrint from "./SemesterReportPrint"

export default function F_CLOSemesterReportsRead() {

    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const [studentId, setStudentId] = useState<number | null>(null)
    const [semesterId, setSemesterId] = useState<number | undefined | null>(null)
    const [selectedSemester, setSelectedSemester] = useState<COESemester>() // Add state for selected semester object
    const [selectedStudentData, setSelectedStudentData] = useState<IStudentInfoViewModel>()


    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

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

    const semesterQuery = useCustomReactQuery({
        queryKey: ['semesterQuery'],
        axiosFn: () => {
            return service_COESemester.getSemesterByAQModule()
        },
        options: {
            refetchOnWindowFocus: false,
            select: (data) => data.sort((a, b) => (a.name?.localeCompare(b.name || '') || 0)),
        }
    })

    const studentInfoQuery = useCustomReactQuery({
        queryKey: ['studentInfo', studentId],
        axiosFn: () => {
            return service_account.getCOEStudentInfo({ studentId: studentId! })
        },
        options: {
            enabled: !!studentId,
            refetchOnWindowFocus: false
        }
    })

    const StudentReportData = useCustomReactQuery({
        queryKey: ['studentReport', studentId, selectedSemester?.coeSchoolYearId],
        axiosFn: async () => {
            return service_COECourseSectionStudent.StudentReports({
                param: `studentId=${studentId}&schoolYearId=${selectedSemester?.coeSchoolYearId}`
            })
        },
        options: {
            refetchOnWindowFocus: false,
            enabled: !!(studentId && semesterId && allStudents.isSuccess)
        }
    })

    // Update selected student data when studentId changes
    useEffect(() => {
        setSelectedStudentData(allStudents.data?.find((item: any) => item.id === studentId))
    }, [studentId, allStudents])

    // Set default semester when semester data loads
    useEffect(() => {
        if (semesterQuery.data && semesterQuery.data.length > 0 && semesterId === null) {
            const defaultSemester = semesterQuery.data[0]
            setSemesterId(defaultSemester.id)
            setSelectedSemester(defaultSemester) // Also set the selected semester object
        }
    }, [semesterQuery.data])

    // Handle semester selection change
    const handleSemesterChange = (value: string | null) => {
        if (value && semesterQuery.data) {
            const selectedSemesterObj = semesterQuery.data.find(semester => semester.id?.toString() === value)
            setSemesterId(parseInt(value))
            setSelectedSemester(selectedSemesterObj)
        }
    }

    return (
        <Flex direction={"column"}>
            {/* <Select
                searchable
                w={{ base: '100%', md: '20%', }}
                placeholder={"Chọn sinh viên"}
                label="Sinh viên"
                data={allStudents.data?.map((item: IStudentInfoViewModel) => ({
                    value: item.id!.toString(),
                    label: `${item.code!} - ${item.fullName}`
                })) || []}
                value={studentId?.toString()}
                onChange={(value) => {
                    setStudentId(parseInt(value!))
                }}
            /> */}
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
                <CustomFlexIconTitle icon={<BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />}>
                    Thông tin học kỳ
                </CustomFlexIconTitle>
                <Space />
                <Select
                    w={{ base: '100%', md: '30%', }}
                    placeholder={"Chọn học kỳ"}
                    label="Học kỳ cần in"
                    data={semesterQuery.data?.map((item) => ({
                        value: item.id?.toString() ?? '',
                        label: item.name ?? 'Dữ liệu môn học bị lỗi hoặc không có'
                    })) || []}
                    value={semesterId?.toString() || null} // Add value prop
                    onChange={handleSemesterChange} // Add onChange handler
                />
                <Space />
                {canPrintReportCLOPointOfStudentBySemester(userStore, userPermissionStore) && <CustomFlexRow mt={10}>
                    <SemesterReportPrint
                        StudentReportData={StudentReportData}
                        studentInfoQuery={studentInfoQuery.data || {}}
                        selectedStudentData={selectedStudentData || {}}
                        selectedSemester={selectedSemester || {}}
                    />
                </CustomFlexRow>}

            </Paper>
        </Flex>
    )
}
