'use client'
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { certificateResultService } from "@/shared/APIs/certificateResultService";
import { CertificateResult } from "@/shared/interfaces/certificateResult";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToSelectOptions } from "@/utils/converter";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Checkbox, Group, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";

enum ENUM_BAN_GIAO {
    "Chưa nhận" = 0,
    "Đã bàn giao" = 1
}

export default function CertificateIssuanceFilesTable() {
    const query = useCustomReactQuery({
        queryKey: ["certificateResults"],
        axiosFn: () => certificateResultService.getCertificateResultDecision(),
    });

    const [editedData, setEditedData] = useState<Record<string, CertificateResult>>({})

    const mutation = useMutation({
        mutationFn: async () => {
            return baseAxios.post("/CertificateResult/updatelist", Object.values(editedData).map(item => ({
                id: item.id,
                code: item.code,
                name: item.name,
                concurrencyStamp: item.concurrencyStamp,
                isEnabled: true,
                userId: item.userId,
                examId: item.examId,
                decisionNumber: item.decisionNumber,
                decisionDate: item.decisionDate,
                certificateNumber: item.certificateNumber,
                receivedDate: item.receivedDate,
                registrationNumber: item.registrationNumber,
                handoverStatus: item.handoverStatus,
                note: item.note,
                isPass: true,
                point: item.point,
                certificateReviewBatchId: item.certificateReviewBatchId,
                certificateDecisionId: item.certificateDecisionId
            })))
        }
    })

    const updateEditedData = (rowId: number, updates: Partial<CertificateResult>) => {
        setEditedData(prev => {
            const currentRowData = prev[rowId] || query.data?.find(item => item.id === rowId) || {};
            return { ...prev, [rowId]: { ...currentRowData, ...updates } };
        });
    };

    const columns = useMemo<CustomColumnDef<CertificateResult>[]>(
        () => [
            { header: "Họ tên", accessorKey: "user.fullName" },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
                accessorFn: (row) => ENUM_GENDER[row.user?.gender!]
            },
            {
                header: "Ngày sinh",
                accessorKey: "user.dateOfBirth",
                accessorFn: (row) => row.user?.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(row.user.dateOfBirth!)) : ""
            },
            { header: "Khóa thi", accessorKey: "exam.name" },
            { header: "Điểm thi", accessorKey: "point" },
            {
                header: "Đạt",
                accessorKey: "isPass",
                Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
            },
            { header: "Đợt xét cấp CC", accessorKey: "exam.certificateReviewBatch.name" },
            { header: "Số quyết định", accessorKey: "decisionNumber" },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.decisionDate!))
            },
            { header: "Chứng chỉ", accessorKey: "exam.certificateReviewBatch.certificate.name" },
            {
                header: "Số chứng chỉ",
                id: "certificateNumber",
                accessorFn: (row) => (
                    <TextInput
                        defaultValue={row.certificateNumber}
                        onBlur={(e) => updateEditedData(row.id!, { certificateNumber: e.target.value })}
                    />
                )
            },
            {
                header: "Ngày cấp",
                accessorKey: "receivedDate",
                accessorFn: (row) => (
                    <DateInput
                        defaultValue={row.receivedDate ? new Date(row.receivedDate) : undefined}
                        onChange={(e) => updateEditedData(row.id!, { receivedDate: new Date(e!) })}
                    />
                )
            },
            {
                header: "Số vào sổ",
                id: "registrationNumber",
                accessorFn: (row) => (
                    <TextInput
                        defaultValue={row.registrationNumber}
                        onBlur={(e) => updateEditedData(row.id!, { registrationNumber: e.target.value })}
                    />
                )
            },
            {
                header: "Đã bàn giao",
                accessorKey: "handoverStatus",
                accessorFn: (row) => (
                    <Select
                        data={utils_converter_enumToSelectOptions(ENUM_BAN_GIAO)}
                        defaultValue={row.handoverStatus?.toString()}
                        onChange={(e) => updateEditedData(row.id!, { handoverStatus: parseInt(e!) })}
                    />
                )
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
                size: 400,
                accessorFn: (row) => (
                    <Textarea
                        defaultValue={row.note}
                        onBlur={(e) => updateEditedData(row.id!, { note: e.target.value })}
                    />
                )
            },
            { header: "Ngày cập nhật", accessorKey: "ngayCapNhat" },
            { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        ],
        [query.data]
    );

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <CustomDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <CustomButton actionType="save" onClick={() => {
                        if (Object.keys(editedData).length === 0) {
                            utils_notification_show({ message: "Không có thay đổi nào để lưu", color: "yellow" })
                            return;
                        }
                        mutation.mutate();
                        utils_notification_show({ crudType: "update" });
                    }} />
                    <CustomButton actionType="import" />
                </Group>
            )}
        />
    );
}
