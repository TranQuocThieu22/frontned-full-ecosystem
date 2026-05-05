'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { enum_dayOfRequestStatus } from "@/constants/enum/enum_dayOfRequestStatus";
import useQ_DayOfRequest_GetAll from "@/hooks/query-hooks/DayOffRequest/GetAll";
import { IDayOffRequest } from "@/interfaces/DayOffRequest";
import { Group } from "@mantine/core";
import { MyButtonViewPDF } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_ozjablkxer_ApproveLeave from "./F_ozjablkxer_ApproveLeave";
import F_ozjablkxer_DaysOffDetail from "./F_ozjablkxer_DaysOffDetail";
import F_ozjablkxer_Export from "./F_ozjablkxer_Export";

export default function F_ozjablkxer_Read(
) {
    const query = useQ_DayOfRequest_GetAll({
        params: "?cols=User"
    })
    const columns = useMemo<MRT_ColumnDef<IDayOffRequest>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "user.code"
            },
            {
                header: "Họ Tên",
                accessorKey: "user.fullName"
            },
            {
                header: "Từ ngày",
                accessorKey: "fromDate",
                accessorFn: (row) => {
                    return utils_date_dateToDDMMYYYString(new Date(row.fromDate!))
                }
            },
            {
                header: "Đến ngày",
                accessorKey: "toDate",
                accessorFn: (row) => {
                    return utils_date_dateToDDMMYYYString(new Date(row.toDate!))
                }
            },
            {
                header: "Số buổi nghỉ",
                accessorKey: "totalSection",
            },
            {
                header: "Chi tiết buổi nghỉ",
                accessorKey: "detail",
                Cell: ({ row }) => {
                    return <F_ozjablkxer_DaysOffDetail fromDate={row.original.fromDate?.toString()} toDate={row.original.toDate?.toString()} lecturerId={row.original.userId} />
                }
            },
            {
                header: "File minh chứng",
                accessorKey: "fileProve",
                Cell: ({ row }) => (
                    <MyButtonViewPDF filePath={row.original.filePath} />
                ),
            },
            {
                header: "Lý do",
                accessorKey: "reason"
            },
            {
                header: "Kế hoạch bù",
                accessorKey: "comment"
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                accessorFn: (row) => {
                    return enum_dayOfRequestStatus[row.status!]
                }
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyFieldset title="Danh sách đăng ký nghỉ dạy">
            <MyDataTable
                columns={columns}
                enableRowNumbers={true}
                data={query.data || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <F_ozjablkxer_Export />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_ozjablkxer_ApproveLeave
                                values={row.original}
                            />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

