import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Avatar, Box, Card, Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAt, IconCake, IconId, IconPhoneCall } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import classes from './F_thfkexfuki_generalInfor.module.css';
import { I_userData } from "./F_thfkexfuki_Read_Prototype";

export function AvatarBox({ data }: { data: I_userData }) {
    const matches = useMediaQuery('(max-width: 1126px)');
    const iconSize = matches ? 12 : 16
    return (

        <Card style={{
            display: 'flex',


        }} h={'100%'}>



            <Box style={{
                maxHeight: '100%',
                height: '100%',
                maxWidth: '100%',
                width: '100%',


            }}>


                <Grid>

                    <Grid.Col span={{ base: 12, md: 6 }}
                        style={{ flexGrow: 1 }}
                    >

                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'cover',
                            }}
                            // size={500}
                            radius="md"
                        />
                        {/* </Group> */}
                    </Grid.Col>
                    <Grid.Col
                        span={{ base: 12, md: 6 }}
                        style={{ flexGrow: 1 }}
                    >

                        <Stack>
                            <Text fz="22px" tt="uppercase" fw={700} c="var(--mantine-color-teal-text)" >
                                Student Information
                            </Text>

                            <Text style={{ fontSize: '2rem' }} fw={500} className={classes.name}>
                                {data.fullName}
                            </Text>


                            <Group
                                wrap="nowrap"
                                gap={10} mt={3}>
                                <IconCake stroke={1.5} size={16}
                                    className={classes.icon}
                                    style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }}
                                />
                                <Text fz="lg" c="dimmed">
                                    {data.dob ? data.dob.toLocaleDateString() : new Date().toLocaleDateString()}
                                </Text>
                            </Group>
                            <Group wrap="nowrap" gap={10} mt={3}>
                                <IconAt stroke={1.5} size={iconSize} className={classes.icon}
                                    style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }}
                                />
                                <Text fz="lg" c="dimmed">
                                    {data.email}
                                </Text>
                            </Group>

                            <Group wrap="nowrap" gap={10} mt={5}>
                                <IconPhoneCall stroke={1.5} size={16} style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }} />
                                <Text fz="lg" c="dimmed">
                                    {data.phoneNumber}
                                </Text>
                            </Group>
                            <Group wrap="nowrap" gap={10} mt={5}>
                                <IconId stroke={1.5} size={16} style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }} />
                                <Text fz="lg" c="dimmed">
                                    {data.cccd}
                                </Text>
                            </Group>
                        </Stack>
                    </Grid.Col>
                </Grid>
                {/* </Group> */}
            </Box>
        </Card>

    )
}


export function Box12({ data }: { data: I_userData }) {
    const query = useQuery<I_transactionList[]>({
        queryKey: [`F_thfkexfuki_generalInfor_transactionList`],
        queryFn: async () => transactionList
    })

    const columns = useMemo<MRT_ColumnDef<I_transactionList>[]>(() => [

        {
            header: "Mã Giao Dịch",
            accessorKey: "transactionCode",
        },
        {
            header: "Ngày Thanh Toán",
            accessorKey: "date",
            accessorFn: (originalRow) =>
                (originalRow.date ? originalRow.date : new Date()).toLocaleDateString()


        },
        {
            header: "Số Tiền",
            accessorKey: "transactionFee",

        },
    ], [])

    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <Card >
            <Text style={{ fontSize: '1.25rem' }}>Thanh toán:  {' '}
                <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>

                    <MyNumberFormatter value={data.paidFee} />

                </strong>
            </Text>


            <MyDataTable
                enableStickyHeader
                mantineTableContainerProps={{ style: { maxHeight: "34vh" } }}
                columns={columns}
                data={query.data!}
                enableRowNumbers={true}
            />



        </Card>
    )
}


export function Box13({ data }: { data: I_userData }) {
    const query = useQuery<I_Certificate[]>({
        queryKey: [`F_thfkexfuki_generalInfor_certificateList`],
        queryFn: async () => certificateList
    })

    const columns = useMemo<MRT_ColumnDef<I_Certificate>[]>(() => [

        {
            header: "Chứng chỉ",



            accessorKey: "certificateName",
        },
        {
            header: "Ngày cấp",
            accessorKey: "issueDate",
            accessorFn: (originalRow) =>
                (originalRow.issueDate ? originalRow.issueDate : new Date()).toLocaleDateString()


        },
        // },
        {
            header: "Số văn bằng",
            accessorKey: "certificateNumber",
        }
    ], []);

    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <Card >

            <Text style={{ fontSize: '1.25rem' }}>Danh sách chứng chỉ đạt được: {' '}
                <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>
                    {data.certificate}
                </strong>
            </Text>

            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={query.data!}
                enableRowNumbers={true}
                mantineTableContainerProps={{ style: { maxHeight: "34vh" } }}

            />



        </Card>
    )
}


export function Box21({ data }: { data: I_userData }) {
    const query = useQuery<I_Course[]>({
        queryKey: [`F_thfkexfuki_generalInfor_courseList`],
        queryFn: async () => courseList
    })



    const columns = useMemo<MRT_ColumnDef<I_Course>[]>(() => [

        {
            header: "Tên khóa học", accessorKey: "courseName",

        },
        {
            header: "Cụm thời gian", accessorKey: "timeGroup",
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "startDate",
            accessorFn: (originalRow) =>
                (originalRow.startDate ? originalRow.startDate : new Date()).toLocaleDateString(),

        },
        {
            header: "Hiện diện", accessorKey: "attendance",

        },
        {
            header: "Trạng thái", accessorKey: "status",

        },
        {
            header: "Kết quả", accessorKey: "result",
        },
        {
            header: "Điểm tổng kết", accessorKey: "finalScore",
        }
    ], []);


    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <Card >


            <Text style={{ fontSize: '1.25rem' }}>Khóa học: {' '}
                <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>

                    {data.learningCourses}
                </strong>
            </Text>
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={query.data!}
                enableRowNumbers={true}
            />


        </Card>
    )
}



export function Box31({ data }: { data: I_userData }) {
    const query = useQuery<I_Exam[]>({
        queryKey: [`F_thfkexfuki_generalInfor_examList`],
        queryFn: async () => examList
    })



    const columns = useMemo<MRT_ColumnDef<I_Exam>[]>(() => [

        { header: "Tên khóa thi", accessorKey: "examName" },
        {
            header: "Ngày thi",
            accessorKey: "examDate",
            accessorFn: (originalRow) =>
                (originalRow.examDate ? originalRow.examDate : new Date()).toLocaleDateString()
        },
        { header: "Kết quả", accessorKey: "result" },
        { header: "Điểm tổng kết", accessorKey: "finalScore" }
    ], []);



    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <Card >


            <Text style={{ fontSize: '1.25rem' }}>Khóa thi: {' '}
                <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>

                    {data.examNumber}
                </strong>
            </Text>
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={query.data!}
                enableRowNumbers={true}
            />

        </Card>
    )
}


export function Box41({ data }: { data: I_userData }) {
    const query = useQuery<I_Exam[]>({
        queryKey: [`F_thfkexfuki_generalInfor_feedbackList`],
        queryFn: async () => feedbackList
    })


    const columns = useMemo<MRT_ColumnDef<I_TeacherFeedback>[]>(() => [

        {
            header: "Ngày",
            accessorKey: "date",
            accessorFn: (originalRow) =>
                (originalRow.date ? originalRow.date : new Date()).toLocaleDateString()
        },
        { header: "Tên khóa học", accessorKey: "courseName" },
        { header: "Cụm thời gian", accessorKey: "timeGroup" },
        {
            header: "Ngày khai giảng",
            accessorKey: "startDate",
            accessorFn: (originalRow) =>
                (originalRow.startDate ? originalRow.startDate : new Date()).toLocaleDateString()
        },
        { header: "Lớp", accessorKey: "classCode" },
        { header: "Giảng viên", accessorKey: "teacherName" },
        { header: "Nhận xét", accessorKey: "feedback" }
    ], []);


    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <Card >
            <Text style={{ fontSize: '1.25rem' }}>Nhận xét của giáo viên: {' '}
                <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>

                    {data.feedbackNumber}
                </strong>
            </Text>
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={query.data!}
                enableRowNumbers={true}
            />

        </Card>
    )
}


export default function F_thfkexfuki_generalInfor({ data }: { data: I_userData }) {

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 3, xl: 3 }} style={{ margin: '0.75rem 0 0.75rem 0' }}>
                <AvatarBox data={data} />
                <Box12 data={data} />
                <Box13 data={data} />
            </SimpleGrid>

            <Grid>
                <Grid.Col span={12}>
                    <Box21 data={data} />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={12}>
                    <Box31 data={data} />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={12}>
                    <Box41 data={data} />
                </Grid.Col>
            </Grid>
        </>
    )
}




interface I_transactionList {
    id?: number,
    transactionCode?: string,
    date?: Date,
    transactionFee?: number
}

interface I_TeacherFeedback {
    id?: number;
    date?: Date;
    courseName?: string;
    timeGroup?: string;
    startDate?: Date;
    classCode?: string;
    teacherName?: string;
    feedback?: string;
}

interface I_Exam {
    id?: number;
    examName?: string;
    examDate?: Date;
    result?: string;
    finalScore?: number;
}


interface I_Course {
    id?: number;
    courseName?: string;
    timeGroup?: string;
    startDate?: Date;
    attendance?: string;
    status?: string;
    result?: string;
    finalScore?: number;
}

interface I_Certificate {
    id?: number;
    certificateName?: string;
    issueDate?: Date;
    certificateNumber?: string;
}

const certificateList: I_Certificate[] = [
    { id: 1, certificateName: "Lập trình web", issueDate: new Date("2025-03-03"), certificateNumber: "LTW4856" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 3, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },
    { id: 2, certificateName: "Tin học văn phòng", issueDate: new Date("2025-03-03"), certificateNumber: "LTh4857" },






];


const transactionList: I_transactionList[] = [
    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },



    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },

    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },


    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },



    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },

    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },



    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },

    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },



    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },

    { id: 1, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1500000 },
    { id: 2, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },
    { id: 3, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 1000000 },
    { id: 4, transactionCode: "GD0256", date: new Date("2025-02-01"), transactionFee: 2500000 },



];

const courseList: I_Course[] = [
    { id: 1, courseName: "Lập trình web 24", timeGroup: "Tối 2-4-6", startDate: new Date("2025-01-02"), attendance: "25/30", status: "Hoàn thành", result: "Đạt", finalScore: 7.5 },
    { id: 2, courseName: "Tiếng Anh Vtep", timeGroup: "Tối 3-5-7", startDate: new Date("2025-01-05"), attendance: "18/30", status: "Hoàn thành", result: "Đạt", finalScore: 8.2 },
];

const examList: I_Exam[] = [
    { id: 1, examName: "Kỳ thi Tiếng anh Vtep tháng 2", examDate: new Date("2025-02-28"), result: "Đạt", finalScore: 8.7 }
];

const feedbackList: I_TeacherFeedback[] = [
    { id: 1, date: new Date("2025-02-01"), courseName: "Lập trình web 24", timeGroup: "Tối 2-4-6", startDate: new Date("2025-01-02"), classCode: "LTW2401", teacherName: "Tô Ngọc Châu", feedback: "Chưa làm bài tập" }
];
