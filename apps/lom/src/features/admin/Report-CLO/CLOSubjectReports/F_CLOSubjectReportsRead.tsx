import { service_account } from "@/api/services/service_account"
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent"
import { canPrintReportCLOPointOfStudentBySubjectBasedOnCLO, canPrintReportCLOPointOfStudentBySubjectBasedOnReview } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-subject.auth"
import { StudentList } from "@/interfaces/shared-interfaces/StudentList"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Divider, Flex, Group, Paper, Select, Space } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import { ICourseSetionStudentInfoViewModel, IStudentInfoViewModel } from "../../ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces"
import AssessmentReports from "./AssessmentReports"
import SubjectReportPrint from "./SubjectReportPrint"

export default function F_CLOSubjectReportsRead() {

  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;

  const studentIdState = useState<number | null>(null)
  let [allStudentsData, setAllStudentsData] = useState<any[]>([])
  let [allCourseSectionStudent, setAllCourseSectionStudent] = useState<any[]>([])
  const [selectedStudentData, setSelectedStudentData] = useState<IStudentInfoViewModel>()
  const [selectedCourseSectionStudent, setselectedCourseSectionStudent] = useState<any>()
  const courseSectionStudentIdState = useState<number | undefined | null>(null)

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
  const allCourseSectionByStudent = useQuery<ICourseSetionStudentInfoViewModel[]>({
    queryKey: [`CourseSectionByStudent${studentIdState[0]}`],
    queryFn: async () => {
      const res = await baseAxios.get(`/COECourseSectionStudent/GetByStudent?studentId=${studentIdState[0]}`)
      courseSectionStudentIdState[1](res.data.data[0].id)
      setAllCourseSectionStudent(res.data.data)

      return res.data.data
    },
    refetchOnWindowFocus: false,
    enabled: !!studentIdState[0] && allStudents.isSuccess
  })
  const studentInfoQuery = useCustomReactQuery({
    queryKey: ['studentInfo', studentIdState[0]],
    axiosFn: () => {

      return service_account.getCOEStudentInfo({ studentId: studentIdState[0]! })
    },
    options: {
      enabled: !!studentIdState[0]
    }
  })
  const StudentReportData = useCustomReactQuery({
    queryKey: [`${studentIdState[0]}, ${courseSectionStudentIdState}`],
    axiosFn: async () => {
      const selectedCourseSection = allCourseSectionStudent.find(
        (item: any) => item.id === courseSectionStudentIdState[0]
      );
      return service_COECourseSectionStudent.StudentReports({
        param:
          `studentId=${studentIdState[0]}&courseSectionId=${selectedCourseSection?.coeCourseSection?.id}`
      })
    }, options: {
      refetchOnWindowFocus: false,
      enabled:
        (!!studentIdState[0] && allStudents.isSuccess) &&
        (!!courseSectionStudentIdState[0] && allCourseSectionByStudent.isSuccess)
    }

  })

  useEffect(() => {
    courseSectionStudentIdState[1](null)
    allCourseSectionByStudent.refetch()

    setSelectedStudentData(allStudentsData.find((item: any) => item.id === studentIdState[0]))
  }, [studentIdState[0]])
  useEffect(() => {
    setselectedCourseSectionStudent(allCourseSectionStudent.find((item: any) => item.id === courseSectionStudentIdState[0]))
  }, [courseSectionStudentIdState[0]])

  return (
    <Flex direction={"column"}>
      {/* <Select
        searchable
        w={{ base: '100%', md: '20%', }}
        placeholder={"Chọn sinh viên"}
        label="Sinh viên"
        data={allStudents.data?.map((item: IStudentInfoViewModel) => ({
          value: item.id!.toString(),
          label: `${item.code!} - ${item.fullName} `
        })) || []}
        value={studentIdState[0]?.toString()}
        onChange={(value, option) => {
          studentIdState[1](parseInt(value!))
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
          studentIdState[1](value?.id || 0)
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
          Thông tin môn học
        </CustomFlexIconTitle>
        <Space />
        <Select
          w={{ base: '100%', md: '30%', }}
          placeholder={"Chọn môn học"}
          label="Môn học"
          data={allCourseSectionByStudent.data?.map((item: ICourseSetionStudentInfoViewModel) => ({
            value: item.id!.toString(),
            label: item.coeCourseSection?.coeGradeSubject?.coeSubject === null ? 'Dữ liệu môn học bị lỗi hoặc không có'
              :
              item.coeCourseSection?.coeGradeSubject?.coeSubject.name === null ? 'Dữ liệu tên môn học bị lỗi hoặc không có'
                : `${item.coeCourseSection?.coeGradeSubject?.coeSubject.code} - ${item.coeCourseSection?.coeGradeSubject?.coeSubject.name}`
          })) || []}
          value={courseSectionStudentIdState[0] === null ? null : courseSectionStudentIdState[0]?.toString()}
          onChange={(value, option) => {
            courseSectionStudentIdState[1](parseInt(value!))
          }}
        />
        <Space />
        <CustomFlexRow mt={10}>
          {
            canPrintReportCLOPointOfStudentBySubjectBasedOnCLO(userStore, userPermissionStore)
            && <SubjectReportPrint
              StudentReportData={StudentReportData}
              studentInfoQuery={studentInfoQuery.data || {}}
              selectedCourseSectionStudent={selectedCourseSectionStudent}
              selectedStudentData={selectedStudentData || {}} />
          }
          {
            canPrintReportCLOPointOfStudentBySubjectBasedOnReview(userStore, userPermissionStore)
            && <AssessmentReports
              StudentReportData={StudentReportData}
              studentInfoQuery={studentInfoQuery.data || {}}
              selectedCourseSectionStudent={selectedCourseSectionStudent}
              selectedStudentData={selectedStudentData || {}} />
          }
        </CustomFlexRow>
      </Paper>
    </Flex>
  )
}
