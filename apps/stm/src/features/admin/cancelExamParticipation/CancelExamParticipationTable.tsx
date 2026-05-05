'use client'

import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { ActionIcon, Group, Modal, Paper, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { IconLivePhoto } from "@tabler/icons-react";
import { useMemo } from "react";
import CancelExamParticipationWithdraw from "./CancelExamParticipationWithdraw";
import CancelExamParticipationReserve from "./CancelExamParticipationReserve";

interface I {
    code?: string;
    fullName?: string;
    gender?: keyof typeof ENUM_GENDER;
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
    exam?: {
        code?: string;
        name?: string;
        officialExamDate?: string;
    };
    branch?: string;
    status?: string;
    decisionDate?: string;
    decisionName?: string;
    note?: string;
    filePath?: string;
    modifiedWhen?: string;
    modifiedFullName?: string;
}

function PdfViewButton({ filePath, label }: { filePath?: string; label?: string }) {
    const disc = useDisclosure(false);
    return (
        <>
            <Tooltip label="Xem biên lai">
                <ActionIcon color="cyan" variant="light" onClick={disc[1].open}>
                    <IconLivePhoto />
                </ActionIcon>
            </Tooltip>
            <Modal opened={disc[0]} onClose={disc[1].close} size="80%" title={<Text>Xem biên lai chuyển khoản</Text>}>
                <Paper h="80vh" p="lg">
                    {filePath
                        ? <iframe src={filePath} width="100%" height="100%" />
                        : <Text c="dimmed">Không có file đính kèm</Text>
                    }
                </Paper>
            </Modal>
        </>
    );
}

export default function CancelExamParticipationTable() {
    const query = useQuery<I[]>({
        queryKey: ["Exam_GetStudent"],
        queryFn: async () => [
            {
                code: "HV0001",
                fullName: "Nguyễn Văn A",
                gender: "Nam",
                dateOfBirth: "1990-01-01",
                phoneNumber: "0896585235",
                email: "a@gmail.com",
                exam: { code: "DGT2401", name: "Digital marketing 2024", officialExamDate: "2025-03-15" },
                branch: "Thủ Đức",
                status: "Hoãn thi",
                decisionDate: "", decisionName: "", note: "", modifiedWhen: "", modifiedFullName: ""
            },
            {
                code: "HV0002",
                fullName: "Nguyễn Văn B",
                gender: "Nam",
                dateOfBirth: "1990-01-01",
                phoneNumber: "0896585235",
                email: "b@gmail.com",
                exam: { code: "DGT2401", name: "Digital marketing 2024", officialExamDate: "2025-03-15" },
                branch: "Thủ Đức",
                status: "Chờ thi",
                decisionDate: "", decisionName: "", note: "", modifiedWhen: "", modifiedFullName: ""
            }
        ],
    })

    const columns = useMemo<CustomColumnDef<I>[]>(() => [
        { header: "Mã học viên", accessorKey: "code" },
        { header: "Họ tên", accessorKey: "fullName" },
        { header: "Giới tính", accessorKey: "gender" },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.dateOfBirth!))
        },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
        { header: "Email", accessorKey: "email" },
        { header: "Mã khóa thi", accessorKey: "exam.code" },
        { header: "Tên khóa thi", accessorKey: "exam.name" },
        {
            header: "Ngày thi",
            accessorKey: "exam.officialExamDate",
            Cell: ({ row }) => utils_date_dateToDDMMYYYString(new Date(row.original.exam?.officialExamDate!))
        },
        { header: "Chi nhánh", accessorKey: "branch" },
        { header: "Trạng thái", accessorKey: "status" },
        {
            header: "Ngày quyết định",
            accessorKey: "decisionDate",
            accessorFn: (row) => row.decisionDate ? utils_date_dateToDDMMYYYString(new Date(row.decisionDate)) : ""
        },
        { header: "Tên quyết định", accessorKey: "decisionName" },
        { header: "Ghi chú", accessorKey: "note" },
        {
            header: "Biên lai chuyển khoản",
            id: "filePath",
            accessorFn: (row) => <PdfViewButton filePath={row.filePath} label="xem" />
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen!))
        },
        { header: "Người cập nhật", accessorKey: "modifiedFullName" },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <CustomFieldset title="Danh sách đăng ký khóa thi">
            <CustomDataTable
                columns={columns}
                data={query.data ?? []}
                enableRowSelection={true}
                enableRowNumbers={true}
                initialState={{
                    density: "md",
                    columnVisibility: {
                        modifiedWhen: false,
                        modifiedFullName: false
                    },
                }}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <CancelExamParticipationWithdraw />
                        <CancelExamParticipationReserve />
                    </Group>
                )}
            />
        </CustomFieldset>
    )
}
