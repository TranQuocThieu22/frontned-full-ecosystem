"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Fieldset, Grid, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface IProgressBypirjlnnwhvIdViewModel {
    id?: number;
    academicYearCode?: string;
    academicYearName?: string;
    examCode?: string;
    courseName?: string;
    courseStatus?: string;
    courseScore?: number;
    examScore?: number;
    certificateNumber?: string;
    courseFee?: number;
    regulationFee?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IProgressBypirjlnnwhvIdViewModel[] = [
    {
        id: 1,
        academicYearCode: "LTB24011-10",
        academicYearName: "Lập trình web 2024",
        examCode: "KT001",
        courseName: "Lập trình web",
        courseStatus: "Hoàn thành",
        courseScore: 8,
        examScore: 8.5,
        certificateNumber: "W-258954",
        courseFee: 15000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 2,
        academicYearCode: "LTB24012-10",
        academicYearName: "Lập trình web 2025",
        examCode: "KT002",
        courseName: "Lập trình web nâng cao",
        courseStatus: "Đang học",
        courseScore: 7,
        examScore: 7.5,
        certificateNumber: "W-258955",
        courseFee: 16000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 3,
        academicYearCode: "LTB24013-10",
        academicYearName: "Lập trình web 2026",
        examCode: "KT003",
        courseName: "Lập trình web cơ bản",
        courseStatus: "Chưa hoàn thành",
        courseScore: 6,
        examScore: 6.5,
        certificateNumber: "W-258956",
        courseFee: 14000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 4,
        academicYearCode: "LTB24014-10",
        academicYearName: "Lập trình web 2027",
        examCode: "KT004",
        courseName: "Lập trình web chuyên sâu",
        courseStatus: "Hoàn thành",
        courseScore: 9,
        examScore: 9.5,
        certificateNumber: "W-258957",
        courseFee: 17000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    }
]
const mockData2: IProgressBypirjlnnwhvIdViewModel[] = [
    {
        id: 5,
        academicYearCode: "LTB24015-10",
        academicYearName: "Lập trình web 2028",
        examCode: "",
        courseName: "Lập trình web nâng cao 2",
        courseStatus: "Hoàn thành",
        courseScore: 9,
        examScore: 9.5,
        certificateNumber: "W-258958",
        courseFee: 18000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 6,
        academicYearCode: "LTB24016-10",
        academicYearName: "Lập trình web 2029",
        examCode: "",
        courseName: "Lập trình web cơ bản 2",
        courseStatus: "Đang học",
        courseScore: 8,
        examScore: 8.5,
        certificateNumber: "W-258959",
        courseFee: 19000000,
        regulationFee: 0,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    }
]

interface IpirjlnnwhvInfoViewModel {
    id?: number;
    code?: string;
    name?: string;
    gender?: string;
    dataOfBirth?: Date | undefined;
    phone?: string;
    email?: string;
    studyStatus?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData3: IpirjlnnwhvInfoViewModel = {
    id: 1,
    code: "SV001",
    name: "Nguyễn Văn A",
    gender: "Nam",
    dataOfBirth: new Date("2000-01-01T00:00:00Z"),
    phone: "0123456789",
    email: "nguyenvana@example.com",
    studyStatus: "Đang học",
    nguoiCapNhat: "admin",
    ngayCapNhat: new Date("2024-12-19")
}

export default function F_pirjlnnwhv_ReadByIdButton(
    { pirjlnnwhvId }: { pirjlnnwhvId: number }
) {

    const pirjlnnwhvInfoById = useQuery<IpirjlnnwhvInfoViewModel>({
        queryKey: [`F_pirjlnnwhvInfoById`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData3
        },
    })

    const ProgressBypirjlnnwhvId = useQuery<IProgressBypirjlnnwhvIdViewModel[]>({
        queryKey: [`ClassParticipantF9_1CheckAttendace`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const disc = useDisclosure(false)

    const columns = useMemo<MRT_ColumnDef<IProgressBypirjlnnwhvIdViewModel>[]>(() => [
        {
            header: "Mã năm học",
            accessorKey: "academicYearCode",
        },
        {
            header: "Tên năm học",
            accessorKey: "academicYearName",
        },
        {
            header: "Mã kỳ thi",
            accessorKey: "examCode",
            size: 150
        },
        {
            header: "Tên khóa học",
            accessorKey: "courseName",
        },
        {
            header: "Trạng thái khóa học",
            accessorKey: "courseStatus",
        },
        {
            header: "Điểm khóa học",
            accessorKey: "courseScore",
            size: 150
        },
        {
            header: "Điểm kỳ thi",
            accessorKey: "examScore",
            size: 120
        },
        {
            header: "Số chứng chỉ",
            accessorKey: "certificateNumber",
        },
        {
            header: "Học phí khóa học",
            accessorKey: "courseFee",
        },
        {
            header: "Phí quy định",
            accessorKey: "regulationFee",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        },
    ], []);


    return (
        <>
            <MyButtonModal
                modalSize={"100%"}
                variant='light'
                color='blue'
                label="Xem quá trình học"
                title="Quá trình học tập"
                disclosure={disc}
            >
                <MyFlexColumn >

                    {pirjlnnwhvInfoById.isLoading && "Đang tải dữ liệu..."}
                    {pirjlnnwhvInfoById.isError && "Lỗi khi tải dữ liệu..."}
                    <Grid>
                        <Grid.Col span={{ base: 12, lg: 4 }}>
                            <Table
                                w={'100%'}
                                variant="vertical" layout="fixed">
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Th w={160}>Họ tên</Table.Th>
                                        <Table.Td>{pirjlnnwhvInfoById.data?.name!}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Mã sinh viên</Table.Th>
                                        <Table.Td>{pirjlnnwhvInfoById.data?.code!}</Table.Td>
                                    </Table.Tr>

                                    <Table.Tr>
                                        <Table.Th>Trạng thái</Table.Th>
                                        <Table.Td>{pirjlnnwhvInfoById.data?.studyStatus!}</Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Grid.Col>
                    </Grid>

                    {ProgressBypirjlnnwhvId.isLoading && "Đang tải dữ liệu..."}
                    {ProgressBypirjlnnwhvId.isError && "Lỗi khi tải dữ liệu..."}
                    <Fieldset
                        legend='Lịch sử khóa học'
                    >
                        <MyDataTable
                            initialState={{
                                density: "xs",
                                pagination: { pageIndex: 0, pageSize: 10 },
                                columnPinning: { right: ["mrt-row-actions"] },
                                columnVisibility: {
                                    nguoiCapNhat: false,
                                    ngayCapNhat: false
                                }
                            }}
                            columns={columns}
                            data={ProgressBypirjlnnwhvId.data!}
                        />
                    </Fieldset>
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}



