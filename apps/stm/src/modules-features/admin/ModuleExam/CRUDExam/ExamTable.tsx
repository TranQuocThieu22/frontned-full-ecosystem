'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Badge, Button, Group, Text } from "@mantine/core";
import { IconBook2, IconCheck, IconClock, IconFlag, IconLock, IconPlayerPause, IconSquareCheckFilled, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExamCreateModal from "./ExamCreateModal";
import ExamDeleteButton from "./ExamDeleteButton";
import ExamDeleteListButton from "./ExamDeleteListButton";
import ExamUpdateModal from "./ExamUpdateModal";
import { IExam } from "./Interfaces/ExamViewModel";

export default function ExamTable() {

    const AllExams = useQuery<IExam[]>({
        queryKey: [`AllExams`],
        queryFn: async () => {
            const response = await baseAxios.get("/Exam/GetExam");
            return response.data.data;
        },
    })

    const columns = useMemo<MRT_ColumnDef<IExam>[]>(
        () => [
            {
                header: "Mã khóa thi",
                accessorKey: "code"
            },

            {
                header: "Tên khóa thi",
                accessorKey: "name"
            },
            {
                header: "Tên chương trình",
                accessorKey: "program.name"
            },

            {
                header: "Ngày thi",
                accessorKey: "examDate",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.examDate!))
            },
            {
                header: "Trang thái",
                accessorKey: "status",
                accessorFn: (row) => <DisplayExamStatus ExamStatus={row.status!} />,
                size: 250

            },
            {
                header: "Số lượng tối đa",
                accessorKey: "maxStudent"
            },
            {
                header: "Số lượng học viên",
                accessorkey: "courseSectionNumberTotal",
                accessorFn: (row) => <Text>{row.courseSectionNumberTotal}</Text>,
            },
            {
                header: "Tính chất phòng",
                accessorkey: "roomType.code",
                accessorFn: (row) => row.roomType?.name
            },

            //todo: fix bug
            // {
            //     header: "Học viên dự thi",
            //     accessorFn: (row) => 0
            // },
            // {
            //     header: "Tổng số dự thi",
            //     accessorFn: (row) => 0
            // },
            // {
            //     header: "Lệ phí thi",
            //     accessorFn: (row) => 0
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "modifiedBy",
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "modifiedWhen",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            //     },
            // }
        ]
        ,
        []
    );

    if (AllExams.isLoading) return "Đang tải dữ liệu..."
    if (AllExams.isError) return "Không có dữ liệu..."
    return (
        <>
            <MyDataTable
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                    columnPinning: { right: ['mrt-row-actions'] }
                }}
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={AllExams.data!}
                exportAble={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <ExamCreateModal />
                                <ExamDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                                <Button
                                    color="teal"
                                >
                                    Import
                                </Button>
                            </Group>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ExamUpdateModal examValues={row.original!} />
                            <ExamDeleteButton examId={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </>
    )
}

export function DisplayExamStatus({ ExamStatus }: { ExamStatus: number }) {
    switch (ExamStatus) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="#d3d3d3" radius="xs">
                        Chưa mở đăng ký
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconSquareCheckFilled />}
                        variant="light" color="#32cd32" radius="xs">
                        Đang mở đăng ký
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconLock />}
                        variant="light" color="#ffa500" radius="xs">
                        Đóng đăng ký
                    </Badge>
                </>
            );
        case 4:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconBook2 />}
                        variant="light" color="#1e90ff" radius="xs">
                        Đã bắt đầu
                    </Badge>
                </>
            );
        case 5:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconPlayerPause />}
                        variant="light" color="#ffd700" radius="xs">
                        Đang tạm dừng
                    </Badge>
                </>
            );
        case 6:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconFlag />}
                        variant="light" color="#006400" radius="xs">
                        Hoàn thành
                    </Badge>
                </>
            );
        case 7:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="#004080" radius="xs">
                        Đã đóng
                    </Badge>
                </>
            );
        case 8:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconX />}
                        variant="light" color="#ff0000" radius="xs">
                        Bị Hủy
                    </Badge>
                </>
            );
        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="#32cd32" radius="xs">
                        Chưa có trạng thái
                    </Badge>
                </>
            );
    }
}
