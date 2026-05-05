import baseAxios from "@/api/config/baseAxios";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Badge, Box, Divider, Flex, Paper, Progress, Text, Title, useMantineColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useState } from "react";
import ScoreConfigTableByCourseSection from "./ScoreConfigTableByCourseSection";

interface I_examList {
    id?: number,
    subjectCode?: string,
    title?: string,
    timeStart?: string,
    date?: Date,
    isGood?: boolean

}

interface I_courseDetail {
    id?: number,
    subjectCode?: string,
    title?: string
}

interface I_gradeList {
    id?: number,
    subjectCode?: string,
    lyThuyet?: number,
    thucHanh?: number,

    total?: number,
    dayInput?: Date
}


export default function F_fvmyvvji8z_Read() {
    const { colorScheme } = useMantineColorScheme();
    const [selectedCourse, setSelectedCourse] = useState<ICourseSection>()
    const currentUser = useStore_Authenticate()
    const examListQuery = useQuery<ICourseSection[]>({
        queryKey: [`F_fvmyvvji8z_Read`],
        queryFn: async () => {
            // const userId = 831
            // const PARAM = `?StudentId=${userId}`
            const PARAM = `?StudentId=${currentUser.state.userId}`
            const response = await baseAxios.get(`/Course/GetCourseRegistrationByStudent${PARAM}`);
            // const response = await baseAxios.get("/exam/getexam");

            const result = response.data.data;
            setSelectedCourse(result[0] as ICourseSection)
            return result;
        }
    })

    // useEffect(() => {
    //     if (!selectedCourse.subjectCode) {

    //         const foundCourse = examListQuery.data ? examListQuery.data.find(item => item.id === 1) : {};
    //         setSelectedCourse(
    //             {
    //                 id: foundCourse?.id,
    //                 subjectCode: foundCourse?.subjectCode,
    //                 title: foundCourse?.title
    //             }
    //         )
    //     }
    // }, [examListQuery.data])
    if (examListQuery.isLoading) { return "Đang tải dữ liệu" }
    if (examListQuery.isError) { return "Lỗi khi tải dữ liệu!" }

    return (
        <MyFlexRow style={{ height: '80vh' }}>
            <Flex gap={8} style={{ width: '100%', height: '100%' }}>
                {/* khung bên trái */}
                <MyFieldset
                    customLegend={<Title order={3}>Khóa thi của tôi</Title>}
                    p='sm'
                    styles={colorScheme === "light"
                        ? {
                            legend: {
                                borderLeft: '4px solid rgb(165 165 165)',
                                backgroundColor: "rgb(230 230 230)",
                                color: 'rgb(49 49 49)'
                            }
                        }
                        : {}
                    }
                    style={{ width: '30%' }}
                    title=""
                >
                    <MyFlexColumn gap={16} style={{ overflowY: 'auto', maxHeight: '100%' }}>

                        <MyFlexColumn gap={8}>
                            {
                                examListQuery.data && examListQuery.data.length > 0 ? (
                                    examListQuery.data.map((item) => {
                                        const progressValue = (item.totalLesson && item.totalLessonCompleted)
                                            ? Math.floor(item.totalLesson / item.totalLessonCompleted * 100)
                                            : 0;

                                        return (
                                            <Paper key={item.id} withBorder p="sm"
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Box
                                                    onClick={() => {
                                                        setSelectedCourse(item as ICourseSection)
                                                    }}
                                                >
                                                    <MyFlexColumn gap={4}>
                                                        <MyFlexRow gap={8} align="center" justify="space-between" style={{ width: '100%' }}>
                                                            <Title order={5}>{item.courseTimeCluster.course.name}</Title>
                                                            <Badge size="lg">{progressValue} %</Badge>
                                                        </MyFlexRow>
                                                        <Divider />
                                                        <Title order={6}>Tỉ lệ lớp đã dạy:</Title>
                                                        <Flex align="center" style={{ width: '100%' }}>
                                                            <Progress.Root size="xl" style={{ flexGrow: 1 }}>
                                                                <Progress.Section striped animated value={progressValue} color="green">
                                                                    <Progress.Label></Progress.Label>
                                                                </Progress.Section>
                                                            </Progress.Root>
                                                            <Text style={{ paddingLeft: "1rem" }}>{item.totalLesson}/{item.totalLessonCompleted}</Text>
                                                        </Flex>
                                                    </MyFlexColumn>
                                                </Box>
                                            </Paper>
                                        )
                                    })
                                ) : (
                                    <Text c="dimmed" ta="center">Chưa có khóa thi nào</Text>
                                )
                            }
                        </MyFlexColumn>
                    </MyFlexColumn>
                </MyFieldset>
                {/* khung bên phải */}
                {
                    // selectedCourse && query2.data && <CourseDetail selectedCourse={selectedCourse} data={query2.data} />
                    selectedCourse && <ScoreConfigTableByCourseSection
                        scoreConfigData={selectedCourse.courseTimeCluster.course.program.scoreConfigs || []} courseData={selectedCourse.courseTimeCluster.course} />
                }
            </Flex>
        </MyFlexRow>
    )
}

const examList: I_examList[] = [
    {
        id: 1,
        title: "Lập trình web",
        subjectCode: "WE001",
        timeStart: "08:00",
        isGood: true,
        date: new Date("2025-02-22")

    },
    {
        id: 2,
        title: "Tiếng anh thương mại",
        subjectCode: "TA001",
        timeStart: "08:00",
        isGood: false,
        date: new Date("2025-02-25")
    },
]
const grade_list: I_gradeList[] = [
    {
        id: 1,

        subjectCode: "WE001",
        lyThuyet: 8.5,
        thucHanh: 4.3,

        total: 8.1,
        dayInput: new Date("2025-02-20")

    },
    {
        id: 2,
        subjectCode: "TA001",
        lyThuyet: 10,
        thucHanh: 4.3,

        total: 8.1,
        dayInput: new Date("2025-02-20")

    },
]

interface IExamCourse {
    examId: number;
    courseId: number;
    courseName: string;
    courseCode: string;
    courseTestDate: string;
    courseStatus: number;
    programName: string;
    quantity: number;
    reserveQuantity: number;
    status: number;
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
interface Role {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
    createdWhen: string | null;
    createdBy: number | null;
    modifiedWhen: string | null;
    modifiedBy: number | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface User {
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
    gender: number;
    dateOfBirth: string | null;
    educationLevel: number;
    modifiedBy: number;
    modifiedWhen: string;
    roles: Role[];
}



interface IAddress {
    location: string | null;
    isInsiteSchool: boolean | null;
    capacity: number;
    testCapacity: number;
    block: string;
    roomTypeId: number;
    branchId: number;
    roomType: IRoomType | null; // adjust type if available
    branch: any | null;         // adjust type if available
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IRoomPriority {
    addressId: number;
    courseSectionId: number;
    address: IAddress;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IExam {
    programId: number;
    examDate: string; // ISO date string
    roomTypeId: number | null;
    status: number;
    startRegistrationDate: string;
    endRegistrationDate: string;
    maxStudent: number;
    branchId: number;
    skillCenterId: number;
    courseSectionNumberTotal: number;
    courseSectionNumber: number;
    officialExamDate: string;
    classPeriod: number;
    examCourses: IExamCourse[] | null;
    certificateReviewBatchId: number | null;
    program: IProgram;
    branch: any | null; // Replace with specific type if known
    skillCenter: any | null; // Replace with specific type if known
    certificateReviewBatch: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IExamCourse {
    examId: number;
    courseId: number;
    courseName: string;
    courseCode: string;
    courseTestDate: string;
    courseStatus: number;
    programName: string;
    quantity: number;
    reserveQuantity: number;
    status: number;
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
    certificate: ICertificate | null;
    skillCenter: ISkillCenter | null;
    subjects: ISubject[] | null;
    programType: IProgramType | null;
    programSubjects: IProgramSubject[];
    scoreConfigs: IScoreConfig[] | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface Role {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
    createdWhen: string | null;
    createdBy: number | null;
    modifiedWhen: string | null;
    modifiedBy: number | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface User {
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
    gender: number;
    dateOfBirth: string | null;
    educationLevel: number;
    modifiedBy: number;
    modifiedWhen: string;
    roles: Role[];
}

interface ICourseSection {
    quantityStudent: number;
    quantityStudentActual: number;
    courseTimeClusterId: number | null;
    isScheduled: boolean;
    status: number | null;
    type: number;
    examId: number;
    certificateReviewBatchId: number | null;
    exam: IExam;
    courseTimeCluster: any | null;
    certificateReviewBatch: any | null;
    roomPriority: IRoomPriority[];
    courseSectionLecturer: any[];
    id: number;
    code: string;
    totalLesson: number;
    totalLessonCompleted: number;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ExamRegistration {
    userId: number;
    examId: number;
    courseSectionId: number;
    receiptType: string | null;
    receiptCode: string | null;
    receiptPrice: number | null;
    receiptLink: string | null;
    receiptNote: string | null;
    note: string | null;
    isCheck: boolean | null;
    user: User;
    exam: IExam | null;
    courseSection: ICourseSection;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
