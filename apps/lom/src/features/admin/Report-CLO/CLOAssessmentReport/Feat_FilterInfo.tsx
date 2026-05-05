import { service_account } from "@/api/services/service_account";
import { service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { enum_formulaType, enumLabel_formulaType } from "@/data/enum/enum_formulaType";
import { canPrintReportCLOPointOfStudentByAssessmentPhase } from "@/features/auth/PageAuthorization/CLO-report-point-student-by-assessment-phase.auth";
import { Account } from "@/interfaces/shared-interfaces/Account";
import { COESubject } from "@/interfaces/shared-interfaces/COESubject";
import { StudentList } from "@/interfaces/shared-interfaces/StudentList";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Divider, Flex, Group, Paper, Select, Space, Table } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import Feat_PrintReport from "./Feat_PrintReport";

export default function Feat_FilterInfo() {

    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const studentIdState = useState<string | null>()
    const studentObjectState = useState<Account>()
    const courseSectionState = useState<COESubject | undefined>()
    const formulaTypeState = useState<string | null>(enum_formulaType.attendace.toString())

    const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
    const paginationState = useState({ pageIndex: 0, pageSize: 20 });

    const [studentSearchInput, setStudentSearchInput] = useState("");
    const [debouncedStudentSearch] = useDebouncedValue(studentSearchInput.length >= 2 ? studentSearchInput : "", 800);

    const studentReportQuery = useCustomReactQuery({
        queryKey: ["studentReport", 'byStudentId', studentIdState[0], 'byCourseSectionId', courseSectionState[0]?.coeCourseSection?.id, 'byFormulaType', formulaTypeState[0]],
        axiosFn: () => service_COECourseSectionStudent.getStudentReport({
            studentId: parseInt(studentIdState[0]!),
            courseSectionId: courseSectionState[0]?.coeCourseSection?.id,
            formulaType: parseInt(formulaTypeState[0]!)
        }),
        options: {
            enabled: !!studentIdState[0] && !!formulaTypeState[0] && !!courseSectionState[0]
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
    const courseSectionGetByStudentQuery = useCustomReactQuery({
        queryKey: ['courseSection', studentIdState[0]],
        axiosFn: () => service_COECourseSectionStudent.getByStudent({ studentId: parseInt(studentIdState[0]!) }),
        options: {
            enabled: !!studentIdState[0]
        }
    })
    useEffect(() => {
        courseSectionState[1](undefined);
    }, [studentIdState[0]]);
    return (
        <Flex direction={"column"}>
            {/* <MySelectFromAPI
                w={400}
                label="Sinh viên"
                getOptionLabel={(e) => e.code + " - " + e.fullName || ""}
                queryKey={['students']}
                axiosFn={service_account.getStudentCOE}
                autoSelectFirstItem
                setObjectData={studentObjectState[1]}
                value={studentIdState[0]}
                onChange={studentIdState[1]}
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
                    studentIdState[1](value?.id?.toString() || undefined)
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
                <Group grow>
                    <CustomSelectAPI
                        label="Môn học"
                        query={courseSectionGetByStudentQuery}

                        value={courseSectionState[0]?.id}
                        onChange={(value, item) => {
                            courseSectionState[1](item)
                        }}
                        getLabel={opt => {
                            if (opt.coeCourseSection?.coeGradeSubject?.coeSubject == null) {
                                return "Dữ liệu môn học bị lỗi hoặc không có"
                            }
                            return opt.coeCourseSection?.coeGradeSubject?.coeSubject?.name || ""
                        }}

                    />
                    <Select
                        label="Hình thức đánh giá"
                        data={converterUtils.mapEnumToSelectData(enum_formulaType, enumLabel_formulaType)}
                        value={formulaTypeState[0]}
                        onChange={formulaTypeState[1]}
                    />
                </Group>
                <Space />
                {canPrintReportCLOPointOfStudentByAssessmentPhase(userStore, userPermissionStore) && <Feat_PrintReport
                    disable={!courseSectionState[0]}
                    dateOfBirth={studentObjectState[0]?.dateOfBirth}
                    studentName={studentObjectState[0]?.fullName}
                    gender={studentObjectState[0]?.gender}
                    programName={studentInfoQuery.data?.coeProgramName}
                    gradeName={studentInfoQuery.data?.coeGradeName}
                    className={studentInfoQuery.data?.className}
                    subjectName={courseSectionState[0]?.coeCourseSection?.coeGradeSubject?.coeSubject?.name}
                    desciption={`Thành phần: ${enumLabel_formulaType[parseInt(formulaTypeState[0]!) as enum_formulaType]}`}
                >
                    <Table style={{ border: "1px solid black" }}>
                        <Table.Thead style={{ border: "1px solid black" }}>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Th style={{ border: "1px solid black" }}>STT</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Mã CĐR</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Chuẩn đầu ra môn học</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Điểm tối đa</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Điểm đạt được</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Quy đổi hệ 10</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody style={{ border: "1px solid black" }}>
                            {studentReportQuery.data?.[0]?.studentPoints?.map((item, idx) => (
                                <Table.Tr style={{ border: "1px solid black" }} key={idx}>
                                    <Table.Td style={{ border: "1px solid black" }}>{idx + 1}</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>{item.cloCode}</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>{item.cloName}</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>{item.medthodMaxPoint}</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>{item.point}</Table.Td>
                                    <Table.Td style={{ border: "1px solid black" }}>{item.point10}</Table.Td>
                                </Table.Tr>
                            ))}

                        </Table.Tbody>
                    </Table>
                </Feat_PrintReport>
                }
            </Paper>
        </Flex>
    )
}
