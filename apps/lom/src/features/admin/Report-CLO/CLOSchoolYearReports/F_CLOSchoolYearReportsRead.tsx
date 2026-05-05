import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import { service_COESchoolYear } from "@/api/services/service_COESchoolYear"
import { canPrintReportCLOPointOfStudentByAcademicYear } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-academic-year.auth"
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
import { BookOpen, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import { IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces"
import SchoolYearReportPrint from "./SchoolYearReportPrint"

export default function F_CLOSchoolYearReportsRead() {

  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;

  const [studentId, setStudentId] = useState<number | null>(null)
  const [semesterId, setSemesterId] = useState<number | undefined | null>(null)
  const [selectedSchoolYear, setselectedSchoolYear] = useState<COESemester>()
  let [allStudentsData, setAllStudentsData] = useState<any[]>([])
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

  const schoolYearQuery = useCustomReactQuery({
    queryKey: ['schoolYearQuery'],
    axiosFn: () => {
      return service_COESchoolYear.getAcademicYearByAQModule()
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
    queryKey: ['studentReport', studentId, semesterId],
    axiosFn: async () => {
      return service_COECourseSectionStudent.StudentReports({
        param: `studentId=${studentId}&schoolYearId=${selectedSchoolYear?.id}`
      })
    },
    options: {
      refetchOnWindowFocus: false,
      enabled: !!(studentId && semesterId && allStudents.isSuccess)
    }
  })

  // Update selected student data when studentId changes
  useEffect(() => {
    setSelectedStudentData(allStudentsData.find((item: any) => item.id === studentId))
  }, [studentId, allStudentsData])

  // Set default semester when semester data loads
  useEffect(() => {
    if (schoolYearQuery.data && schoolYearQuery.data.length > 0 && semesterId === null) {
      const defaultSemester = schoolYearQuery.data[0]
      setSemesterId(defaultSemester.id)
      setselectedSchoolYear(defaultSemester) // Also set the selected semester object
    }
  }, [schoolYearQuery.data])

  // Handle semester selection change
  const handleSemesterChange = (value: string | null) => {
    if (value && schoolYearQuery.data) {
      const selectedSchoolYearObj = schoolYearQuery.data.find(semester => semester.id?.toString() === value)
      setSemesterId(parseInt(value))
      setselectedSchoolYear(selectedSchoolYearObj)
    }
  }

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
        <Space />
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
          Thông tin năm học
        </CustomFlexIconTitle>
        <Space />

        <Select
          w={{ base: '100%', md: '30%', }}
          placeholder={"Chọn năm học"}
          label="Năm học cần in"
          data={schoolYearQuery.data?.map((item) => ({
            value: item.id?.toString() ?? '',
            label: item.name ?? 'Dữ liệu môn học bị lỗi hoặc không có'
          })) || []}
          value={semesterId?.toString() || null} // Add value prop
          onChange={handleSemesterChange} // Add onChange handler
        />
        <Space />
        {
          canPrintReportCLOPointOfStudentByAcademicYear(userStore, userPermissionStore) && <CustomFlexRow mt={10}>
            <SchoolYearReportPrint
              StudentReportData={StudentReportData}
              studentInfoQuery={studentInfoQuery.data || {}}
              selectedStudentData={selectedStudentData || {}}
              selectedSchoolYear={selectedSchoolYear || {}}
            />
          </CustomFlexRow>
        }

      </Paper>

    </Flex>
  )
}
