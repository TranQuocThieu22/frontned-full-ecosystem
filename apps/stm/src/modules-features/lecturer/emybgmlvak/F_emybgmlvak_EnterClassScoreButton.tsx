'use client'
import baseAxios from "@/api/config/baseAxios"
import MyButtonImport from "@/components/Buttons/ButtonImport/MyButtonImport"
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Button, Center, Checkbox, Group } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { MyNumberInput } from "aq-fe-framework/components"
import { utils_date_dateToDDMMYYYString, utils_notification_show } from "aq-fe-framework/utils"
import { MRT_ColumnDef } from "mantine-react-table"
import { useEffect, useMemo, useState } from "react"
import F_emybgmlvak_ClassInfo from "./F_emybgmlvak_ClassInfo"


export default function F_emybgmlvak_EnterClassScoreButton(
    { data }: { data: IClassScoreEntry }
) {
    const disc = useDisclosure(false)
    const queryClient = useQueryClient()

    const ClassInfoByScheduleId = useQuery<IClassF9_2ViewModel>({
        queryKey: [`ClassInfoF9_2CheckAttendace`],
        queryFn: async () => {

            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    const [studentConfigScore, setStudentConfigScore] = useState<{ userId: number; scoreConfigId: number; CourseSectionId: number; point: number; test?: number }[]>([]);
    const updateStudentConfigScore = (
        prev: typeof studentConfigScore,
        userId: number,
        scoreConfigId: number,
        courseSectionId: number,
        point: number,
        testId?: number
    ) => {
        const existingIndex = prev.findIndex(
            (item) => item.userId === userId && item.scoreConfigId === scoreConfigId
        );

        if (existingIndex !== -1) {
            return prev.map((item, index) =>
                index === existingIndex ? { ...item, point } : item
            );
        }

        return [
            ...prev,
            {
                id: testId,
                userId: userId,
                scoreConfigId: scoreConfigId,
                CourseSectionId: courseSectionId,
                point: point,
            },
        ];
    };
    const StudentListQuery = useQuery<ITest[]>({
        queryKey: [`F9_2StudentListByClassId`, data.id],
        queryFn: async () => {
            const body =
            {
                "courseTimeClusterId": 0,
                "courseSectionId": data?.id,
                "courseIds": [
                ],
                "pageSize": 0,
                "pageNumber": 0
            }
            const response = await baseAxios.post("/Course/GetStudent", body);

            const result = response.data.data

            return result
        },
        enabled: disc[0]
    })
    const programDetailQuery = useQuery<IProgram>({
        queryKey: [`F9_2ProgramDetail`, data.id],
        queryFn: async () => {
            const response = await baseAxios.get(`/Program/ProgramDetail?programId=${data.courseTimeCluster.course.programId}`);
            const result = response.data.data
            return result;
        },
        enabled: disc[0]
    })

    const form = useForm()
    function updateRow(id?: number, updatedFields?: Partial<ITest>) {
        const rootData = queryClient.getQueryData<ITest[]>([`F9_2StudentListByClassId`, data.id])
        const updatedData = rootData?.map(item =>
            item.id == id ? { ...item, ...updatedFields } : item
        )
        queryClient.setQueryData([`F9_2StudentListByClassId`, data.id], updatedData)
    }

    const columns = useMemo<MRT_ColumnDef<ITest>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            },
        },
        {
            header: "Trạng thái học viên",
            accessorKey: "studentStatus",
        },
        ...(programDetailQuery.data?.scoreConfigs
            ?.filter((config) => {
                return config.scoreType === 1;
            })
            ?.map((config, index) => ({
                header: config.code,
                accessorKey: `${config.id}`,
                accessorFn: (row: any) => {
                    if (!row) return null;
                    const tmp = row.user.courseSectionStudentPoints
                    const pointConfig = tmp.filter((item: any) => item.userId == row.user.id)
                        .filter((item: any) => item.scoreConfigId == config.id)
                        .filter((item: any) => item.courseSectionId == row.courseSectionId)
                        .map((item: any) => item.point)[0]
                    return (
                        <MyNumberInput
                            hideControls
                            value={pointConfig}
                            clampBehavior="strict"
                            allowNegative={false}
                            defaultValue={pointConfig}
                            onBlur={(event) => {
                                const inputValue = (event.target as HTMLInputElement).value;
                                const parsedValue = parseInt(inputValue, 10);
                                updateRow(row.id, { [config.id]: parsedValue });

                                const test = tmp.find((item: any) => item.userId === row.userId && item.scorescoreConfigId === config.id);


                                setStudentConfigScore(prev =>

                                    updateStudentConfigScore(prev, row.user.id, config.id, row.courseSectionId, parsedValue, test?.id)
                                );
                            }}

                        />
                    );
                },
            })) ?? []),
        {
            header: "Tổng kết",
            accessorKey: "totalPoint",

        },
        {
            header: "Đạt",
            accessorKey: "isPass",
            accessorFn: (originalRow) => {
                return (
                    <Center>
                        <Checkbox color="green" readOnly checked={originalRow.isPass || false} onChange={() => { }} ></Checkbox>
                    </Center>
                )
            },
            size: 100
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // },
    ], [programDetailQuery.data]);

    useEffect(() => {
        programDetailQuery.refetch();
    }, [data]);
    programDetailQuery.isLoading && "Đang tải dữ liệu..."
    programDetailQuery.isError && "Lỗi khi tải dữ liệu..."
    StudentListQuery.isLoading && "Đang tải dữ liệu..."
    StudentListQuery.isError && "Lỗi khi tải dữ liệu..."
    return (
        <>
            <MyButtonModal
                modalSize={"80%"}
                variant='light'
                color='orange'
                label="Nhập điểm"
                title="Nhập điểm thành phần"
                disclosure={disc}>
                <form onSubmit={form.onSubmit((values) => {
                    // todo

                    disc[1].close()
                })}>
                    <MyFlexColumn >
                        {programDetailQuery.data && (
                            <F_emybgmlvak_ClassInfo data={data} programDetailData={programDetailQuery.data} />
                        )}


                        {StudentListQuery.data &&

                            <MyDataTable
                                initialState={{
                                    density: "xs",
                                    pagination: { pageIndex: 0, pageSize: 10 },
                                }}
                                columns={columns}
                                data={StudentListQuery.data!}
                                renderTopToolbarCustomActions={() => (
                                    <Group>
                                        <Button onClick={async (value) => {

                                            await baseAxios.put("/CourseSection/StudentPointResult", studentConfigScore)

                                            utils_notification_show({ crudType: "update", message: "Dữ liệu được lưu thành công!" })
                                        }}>Lưu và tổng kết</Button>
                                        <MyButtonImport />
                                        <Button color="red" onClick={async (value) => {


                                        }}>Xóa</Button>
                                    </Group>
                                )}
                            />
                        }
                    </MyFlexColumn>
                </form>
            </MyButtonModal>
        </>
    )
}

interface IClassF9_2ViewModel {
    id?: number;
    code?: string;
    academicYearName?: string;
    summaryFormular?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IClassF9_2ViewModel = {
    id: 1,
    code: "LTBB2401-10",
    academicYearName: "Lập trình web năm 2024 khóa 1",
    summaryFormular: "trọng số",
    nguoiCapNhat: "Admin",
    ngayCapNhat: new Date('2023-09-25')
}

interface IClassParticipantViewModel {
    id?: number;
    code?: string;
    name?: string;
    gender?: string;
    dateOfBirth?: Date | undefined;
    studentStatus?: string;
    attendanceScore?: number;
    midTermScore?: number;
    finalTermScore?: number;
    summaryScore?: number;
    isPassed?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface ITest {
    id?: number;
    code?: string;
    name?: string;
    gender?: string;
    dateOfBirth?: Date | undefined;
    studentStatus?: string;
    attendanceScore?: number;
    midTermScore?: number;
    finalTermScore?: number;
    summaryScore?: number;
    isPass?: boolean;
    nguoiCapNhat?: string;
    scoreConfigs?: IScoreConfig[];
    ngayCapNhat?: Date | undefined;
}
const mockData2: IClassParticipantViewModel[] = [
    {
        id: 1,
        code: "SV001",
        name: "Trần Văn B",
        gender: "Nam",
        dateOfBirth: new Date('2000-01-01T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 9,
        summaryScore: 8,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 2,
        code: "SV002",
        name: "Nguyễn Thị C",
        gender: "Nữ",
        dateOfBirth: new Date('2000-02-02T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 9,
        midTermScore: 8,
        finalTermScore: 9,
        summaryScore: 8.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 3,
        code: "SV003",
        name: "Lê Văn D",
        gender: "Nam",
        dateOfBirth: new Date('2000-03-03T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: undefined,
        midTermScore: undefined,
        finalTermScore: undefined,
        summaryScore: undefined,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 4,
        code: "SV004",
        name: "Phạm Thị E",
        gender: "Nữ",
        dateOfBirth: new Date('2000-04-04T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 5,
        code: "SV005",
        name: "Hoàng Văn F",
        gender: "Nam",
        dateOfBirth: new Date('2000-05-05T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: undefined,
        midTermScore: undefined,
        finalTermScore: undefined,
        summaryScore: undefined,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 6,
        code: "SV006",
        name: "Đặng Thị G",
        gender: "Nữ",
        dateOfBirth: new Date('2000-06-06T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: undefined,
        midTermScore: undefined,
        finalTermScore: undefined,
        summaryScore: undefined,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 7,
        code: "SV007",
        name: "Ngô Văn H",
        gender: "Nam",
        dateOfBirth: new Date('2000-07-07T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 8,
        code: "SV008",
        name: "Vũ Thị I",
        gender: "Nữ",
        dateOfBirth: new Date('2000-08-08T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 7,
        midTermScore: 6,
        finalTermScore: 7,
        summaryScore: 6.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 9,
        code: "SV009",
        name: "Bùi Văn J",
        gender: "Nam",
        dateOfBirth: new Date('2000-09-09T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 10,
        code: "SV010",
        name: "Đỗ Thị K",
        gender: "Nữ",
        dateOfBirth: new Date('2000-10-10T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 6,
        midTermScore: 5,
        finalTermScore: 6,
        summaryScore: 5.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 11,
        code: "SV011",
        name: "Trịnh Văn L",
        gender: "Nam",
        dateOfBirth: new Date('2000-11-11T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 9,
        midTermScore: 8,
        finalTermScore: 9,
        summaryScore: 8.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 12,
        code: "SV012",
        name: "Lý Thị M",
        gender: "Nữ",
        dateOfBirth: new Date('2000-12-12T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 13,
        code: "SV013",
        name: "Phan Văn N",
        gender: "Nam",
        dateOfBirth: new Date('2000-01-13T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 7,
        midTermScore: 6,
        finalTermScore: 7,
        summaryScore: 6.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 14,
        code: "SV014",
        name: "Trương Thị O",
        gender: "Nữ",
        dateOfBirth: new Date('2000-02-14T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 15,
        code: "SV015",
        name: "Đinh Văn P",
        gender: "Nam",
        dateOfBirth: new Date('2000-03-15T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 6,
        midTermScore: 5,
        finalTermScore: 6,
        summaryScore: 5.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 16,
        code: "SV016",
        name: "Nguyễn Thị Q",
        gender: "Nữ",
        dateOfBirth: new Date('2000-04-16T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 9,
        midTermScore: 8,
        finalTermScore: 9,
        summaryScore: 8.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 17,
        code: "SV017",
        name: "Lê Văn R",
        gender: "Nam",
        dateOfBirth: new Date('2000-05-17T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 18,
        code: "SV018",
        name: "Phạm Thị S",
        gender: "Nữ",
        dateOfBirth: new Date('2000-06-18T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 7,
        midTermScore: 6,
        finalTermScore: 7,
        summaryScore: 6.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 19,
        code: "SV019",
        name: "Hoàng Văn T",
        gender: "Nam",
        dateOfBirth: new Date('2000-07-19T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 8,
        midTermScore: 7,
        finalTermScore: 8,
        summaryScore: 7.5,
        isPassed: true,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    },
    {
        id: 20,
        code: "SV020",
        name: "Đặng Thị U",
        gender: "Nữ",
        dateOfBirth: new Date('2000-08-20T00:00:00Z'),
        studentStatus: "Đang học",
        attendanceScore: 6,
        midTermScore: 5,
        finalTermScore: 6,
        summaryScore: 5.5,
        isPassed: false,
        nguoiCapNhat: "Trần Văn B",
        ngayCapNhat: new Date('2023-09-25')
    }
]


interface IClassScoreEntry {
    id?: number;
    code?: string;
    courseName?: string;
    startDateRegistration?: Date | undefined;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    timeClusterDetails?: ItimeClusterDetails[];
    quantityStudent?: number;
    dsHocVien?: number;
    status?: number
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
    course: ICourse
    courseTimeCluster: ICourseTimeCluster
    courseSectionLecturer?: CourseSectionLecturer[]
}

interface ItimeClusterDetails {
    id?: number,
    code?: string,
    name?: string,
    timeClusterId?: number,
    dayOfWeek?: number,
    startTime?: Date,
    endTime?: Date,
    classPeriodStart?: number,
    classPeriodEnd?: number,

}
interface CourseSectionLecturer {
    userId: number;
    courseId: number | null;
    user: any | null; // Consider using a specific type instead of 'any' if possible
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}


interface IRole {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
    createdWhen: string | null;
    createdBy: string | null;
    modifiedWhen: string | null;
    modifiedBy: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface IUser {
    id: number;
    isBlocked: boolean;
    roleId: number;
    userName: string;
    code: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarPath: string;
    fullName: string;
    facultyId: number | null;
    facultyName: string | null;
    classId: number | null;
    majorsId: number | null;
    workingUnitId: number | null;
    workingUnitName: string | null;
    gender: number | null;
    dateOfBirth: Date | null;
    educationLevel: number | null;
    modifiedBy: number;
    modifiedWhen: string;
    roles: IRole[];
}

interface ITimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
    course: ICourse
}

interface ICourse {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
    courseTimeClusters: ICourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseSection {
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    course: ICourse;
    timeCluster: ITimeCluster;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IEnrollment {
    userId: number;
    courseTimeClusterId: number;
    courseSectionId: number;
    user: IUser;
    courseTimeCluster: ICourseTimeCluster;
    courseSection: ICourseSection;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface ICertificate {
    type: number;
    link: string;
    note: string;
    skillCenterId: number;
    skillCenter: ISkillCenter | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ISkillCenter {
    note: string;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IRoomType {
    note: string | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ISubject {
    classPeriodNumber: number;
    hours: number;
    note: string;
    roomTypeId: number;
    roomType: IRoomType;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IProgramSubject {
    programId: number;
    subjectId: number;
    subject: ISubject;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IScoreConfig {
    programId: number;
    scoreType: number;
    percentScore: number;
    scoreMax: number;
    scoreMin: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IProgramType {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IProgram {
    skillCenterId: number;
    programTypeId: number;
    totalClassPeriodNumber: number;
    totalHours: number;
    isTesting: boolean;
    certificateId: number;
    isCancel: boolean;
    note: string;
    price: number;
    scoreSystem: number;
    scoreFormula: number;
    scorePass: number;
    testScoreSystem: number | null;
    testScoreFormula: number | null;
    testScorePass: number | null;
    certificate: ICertificate;
    skillCenter: ISkillCenter;
    subjects: ISubject[] | null;
    programType: IProgramType;
    programSubjects: IProgramSubject[];
    scoreConfigs: IScoreConfig[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
