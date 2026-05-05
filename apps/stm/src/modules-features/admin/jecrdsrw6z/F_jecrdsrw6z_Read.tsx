'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { ENUM_GENDER } from "@/constants/enum/global";
import useQ_CertificateResult_GetCertificateResultDecision from "@/hooks/query-hooks/CertificateResult/useQ_CertificateResult_GetAll";
import { ICertificateResult } from "@/interfaces/certificateResult";
import { utils_converter_enumToSelectOptions } from "@/utils/converter";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import { Checkbox, Group, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function F_jecrdsrw6z_Read() {
    const query = useQ_CertificateResult_GetCertificateResultDecision()
    const [editedData, setEditedData] = useState<Record<string, ICertificateResult>>({})
    const mutation = useMutation({
        mutationFn: async () => {
            const res = baseAxios.post("/CertificateResult/updatelist", Object.values(editedData).map(item => ({
                "id": item.id,
                "code": item.code,
                "name": item.name,
                "concurrencyStamp": item.concurrencyStamp,
                "isEnabled": true,
                "userId": item.userId,
                "examId": item.examId,
                "decisionNumber": item.decisionNumber,
                "decisionDate": item.decisionDate,
                "certificateNumber": item.certificateNumber,
                "receivedDate": item.receivedDate,
                "registrationNumber": item.registrationNumber,
                "handoverStatus": item.handoverStatus,
                "note": item.note,
                "isPass": true,
                "point": item.point,
                "certificateReviewBatchId": item.certificateReviewBatchId,
                "certificateDecisionId": item.certificateDecisionId
            }) as any))
            return res
        }
    })

    // Function to update the edited data while preserving previous edits
    const updateEditedData = (rowId: number, updates: Partial<ICertificateResult>) => {
        setEditedData(prev => {
            // Get the current row data, or use the original row data from query if not yet in editedData
            const currentRowData = prev[rowId] || query.data?.find(item => item.id === rowId) || {};

            // Return a new object with all previous edits and the new update
            return {
                ...prev,
                [rowId]: {
                    ...currentRowData,
                    ...updates
                }
            };
        });
    };

    const columns = useMemo<MRT_ColumnDef<ICertificateResult>[]>(
        () => [
            {
                header: "Họ tên",
                accessorKey: "user.fullName"
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
                accessorFn: (row) => {
                    return ENUM_GENDER[row.user?.gender!]
                }
            },
            {
                header: "Ngày sinh",
                accessorKey: "user.dateOfBirth",
                accessorFn: (row) => {
                    if (!row.user?.dateOfBirth) return "";
                    return utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
                }
            },
            {
                header: "Khóa thi",
                accessorKey: "exam.name"
            },
            {
                header: "Điểm thi",
                accessorKey: "point"
            },
            {
                header: "Đạt",
                accessorKey: "isPass",
                Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
            },
            {
                header: "Đợt xét cấp CC",
                accessorKey: "exam.certificateReviewBatch.name"
            },
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber"
            },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.decisionDate!)),
            },
            {
                header: "Chứng chỉ",
                accessorKey: "exam.certificateReviewBatch.certificate.name"
            },
            {
                header: "Số chứng chỉ",
                accessorFn: (row) => (
                    <TextInput
                        defaultValue={row.certificateNumber}
                        onBlur={(e) => {
                            updateEditedData(row.id!, {
                                certificateNumber: e.target.value
                            });
                        }}
                    />
                )
            },
            {
                header: "Ngày cấp",
                accessorKey: "receivedDate",
                accessorFn: (row) => (
                    <DateInput
                        defaultValue={row.receivedDate ? new Date(row.receivedDate) : undefined}
                        onChange={(e) => {
                            updateEditedData(row.id!, {
                                receivedDate: new Date(e!)
                            });
                        }}
                    />
                )
            },
            {
                header: "Số vào sổ",
                accessorKey: "registrationNumber",
                accessorFn: (row) => (
                    <MyTextInput
                        defaultValue={row.registrationNumber}
                        onBlur={(e) => {
                            updateEditedData(row.id!, {
                                registrationNumber: e.target.value
                            });
                        }}
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
                        onChange={(e) => {
                            updateEditedData(row.id!, {
                                handoverStatus: parseInt(e!)
                            });
                        }}
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
                        onBlur={(e) => {
                            updateEditedData(row.id!, {
                                note: e.target.value
                            });
                        }}
                    />
                )
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
        ],
        [query.data]
    );

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <MyButton crudType="save" onClick={() => {
                        if (Object.keys(editedData).length === 0) {
                            utils_notification_show({ message: "Không có thay đổi nào để lưu", color: "yellow" })
                            return;
                        }
                        mutation.mutate();
                        utils_notification_show({ crudType: "update" });
                    }}>Lưu</MyButton>
                    <MyButton crudType="import" />
                </Group>
            )}
        />
    );
}

enum ENUM_BAN_GIAO {
    "Chưa nhận" = 0,
    "Đã bàn giao" = 1
}